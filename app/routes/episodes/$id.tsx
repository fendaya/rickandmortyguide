import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { fetcher } from "~/utils.server";
import type { Episode } from "~/types";
import { EpisodeCard } from "~/components/cards";

export const loader: LoaderFunction = async ({ params }) => {
  const { id = "-1" } = params;

  const query = `
    query Episode($id: ID!) {
      episode(id: $id) {
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
    }`;

  const { episode } = await fetcher({ query, variables: { id: +id } });

  return episode;
};

const EpisodeIndex = () => {
  const episode = useLoaderData<Episode>();

  return (
    <>
      <h2 className="text-xl font-bold text-sky-800">Episode Detail</h2>

      <div className="mt-4">
        <EpisodeCard episode={episode} />
      </div>
    </>
  );
};

export default EpisodeIndex;
