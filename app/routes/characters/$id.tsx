import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { fetcher } from "~/utils.server";
import type { Character } from "~/types";
import { CharacterCard } from "~/components/cards";

export const loader: LoaderFunction = async ({ params }) => {
  const { id = "-1" } = params;

  const query = `
    query Character($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        gender
        image
        origin {
          id
          name
        }
        location {
          id
          name
        }
        episode {
          id
          name
          episode
        }
      }
    }`;

  const { character } = await fetcher({ query, variables: { id: +id } });

  return character;
};

const CharacterIndex = () => {
  const character = useLoaderData<Character>();

  return (
    <>
      <h2 className="text-xl font-bold text-sky-800">Character Detail</h2>

      <div className="mt-4">
        <CharacterCard character={character} />
      </div>
    </>
  );
};

export default CharacterIndex;
