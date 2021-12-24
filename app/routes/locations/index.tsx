import type { LoaderFunction } from "remix";
import { useLoaderData, useTransition } from "remix";
import { fetcher } from "~/utils.server";
import type { Location } from "~/types";
import SearchForm from "~/components/forms/SearchForm";
import ListNav from "~/components/forms/ListNav";
import { LocationCard } from "~/components/cards";

type IndexData = {
  info: {
    count: number;
    page: number;
    pages: number;
    term: string;
  };
  locations: Location[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("term") ?? "";
  const page = url.searchParams.get("page") ?? "1";

  const query = `
    query Locations($page: Int!, $name: String) {
      locations(page: $page, filter: { name: $name }) {
        info {
          count
          pages
        }
        results {
          id
          name
          type
          dimension
          residents {
            id
            name
            image
          }
        }
      }
    }`;

  const { locations } = await fetcher({
    query,
    variables: { name: term, page: +page },
  });

  return locations
    ? {
        info: {
          ...locations.info,
          page: +page,
          term,
        },
        locations: locations.results,
      }
    : {
        info: {
          count: 0,
          page: +page,
          pages: 0,
          term,
        },
        locations: [],
      };
};

const LocationsIndex = () => {
  const { state } = useTransition();
  const { info, locations } = useLoaderData<IndexData>();
  const busy = state === "submitting";

  return (
    <>
      <h2 className="text-xl font-bold text-sky-800">Locations</h2>

      <div className="mt-4">
        <SearchForm term={info.term} />
      </div>

      <div className="relative mt-4">
        {busy && (
          <div className="absolute inset-0 z-10 w-full h-full opacity-50 bg-gray-50"></div>
        )}

        {locations.length === 0 ? (
          <p className="p-4 text-sm text-center text-gray-800 bg-gray-200">
            No locations found.
          </p>
        ) : (
          <>
            <ListNav info={info} />

            <div className="grid gap-4 mt-4 lg:grid-cols-2 xl:grid-cols-3">
              {locations.map((location) => (
                <LocationCard key={location.id} location={location} isSummary />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LocationsIndex;
