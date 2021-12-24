import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { fetcher } from "~/utils.server";
import type { Location } from "~/types";
import { LocationCard } from "~/components/cards";

export const loader: LoaderFunction = async ({ params }) => {
  const { id = "-1" } = params;

  const query = `
    query Locations($id: ID!) {
      location(id: $id) {
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
    }`;

  const { location } = await fetcher({ query, variables: { id: +id } });

  return location;
};

const LocationIndex = () => {
  const location = useLoaderData<Location>();

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-sky-800">Location Detail</h2>

      <LocationCard location={location} />
    </>
  );
};

export default LocationIndex;
