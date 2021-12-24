import type { LoaderFunction } from "remix";
import { useLoaderData, useTransition } from "remix";
import { fetcher } from "~/utils.server";
import type { Character } from "~/types";
import SearchForm from "~/components/forms/SearchForm";
import ListNav from "~/components/forms/ListNav";
import { CharacterCard } from "~/components/cards";

type IndexData = {
  info: {
    count: number;
    page: number;
    pages: number;
    term: string;
  };
  characters: Character[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("term") ?? "";
  const page = url.searchParams.get("page") ?? "1";

  const query = `
    query Characters($page: Int!, $name: String) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
          pages
        }
        results {
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
          }
        }
      }
    }`;

  const { characters } = await fetcher({
    query,
    variables: { name: term, page: +page },
  });

  return characters
    ? {
        info: {
          ...characters.info,
          page: +page,
          term,
        },
        characters: characters.results,
      }
    : {
        info: {
          count: 0,
          page: +page,
          pages: 0,
          term,
        },
        characters: [],
      };
};

const CharactersIndex = () => {
  const { state } = useTransition();
  const { info, characters } = useLoaderData<IndexData>();
  const busy = state === "submitting";

  return (
    <>
      <h2 className="text-xl font-bold text-sky-800">Characters</h2>

      <div className="mt-4">
        <SearchForm term={info.term} />
      </div>

      <div className="relative mt-4">
        {busy && (
          <div className="absolute inset-0 z-10 w-full h-full opacity-50 bg-gray-50"></div>
        )}

        {characters.length === 0 ? (
          <p className="p-4 text-sm text-center text-gray-800 bg-gray-200">
            No characters found.
          </p>
        ) : (
          <>
            <ListNav info={info} />

            <div className="grid gap-4 mt-4 lg:grid-cols-2 xl:grid-cols-3">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSummary
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CharactersIndex;
