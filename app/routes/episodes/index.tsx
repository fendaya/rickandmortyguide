import type { LoaderFunction } from "remix";
import { useLoaderData, useTransition } from "remix";
import { fetcher } from "~/utils.server";
import type { Episode } from "~/types";
import SearchForm from "~/components/forms/SearchForm";
import ListNav from "~/components/forms/ListNav";
import { EpisodeCard } from "~/components/cards";

type IndexData = {
  info: {
    count: number;
    page: number;
    pages: number;
    term: string;
  };
  episodes: Episode[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("term") ?? "";
  const page = url.searchParams.get("page") ?? "1";

  const query = `
    query Episodes($page: Int!, $name: String) {
      episodes(page: $page, filter: { name: $name }) {
        info {
          count
          pages
        }
        results {
          id
          name
          air_date
          episode
          characters {
            id
            name
            image
          }
        }
      }
    }`;

  const { episodes } = await fetcher({
    query,
    variables: { name: term, page: +page },
  });

  return episodes
    ? {
        info: {
          ...episodes.info,
          page: +page,
          term,
        },
        episodes: episodes.results,
      }
    : {
        info: {
          count: 0,
          page: +page,
          pages: 0,
          term,
        },
        episodes: [],
      };
};

const EpisodesIndex = () => {
  const { state } = useTransition();
  const { info, episodes } = useLoaderData<IndexData>();
  const busy = state === "submitting";

  return (
    <>
      <h2 className="text-xl font-bold text-sky-800">Episodes</h2>

      <div className="mt-4">
        <SearchForm term={info.term} />
      </div>

      <div className="relative mt-4">
        {busy && (
          <div className="absolute inset-0 z-10 w-full h-full opacity-50 bg-gray-50"></div>
        )}

        {episodes.length === 0 ? (
          <p className="p-4 text-sm text-center text-gray-800 bg-gray-200">
            No episodes found.
          </p>
        ) : (
          <>
            <ListNav info={info} />

            <div className="grid gap-4 mt-4 lg:grid-cols-2 xl:grid-cols-3">
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} isSummary />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EpisodesIndex;
