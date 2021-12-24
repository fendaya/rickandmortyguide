import type { LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  routes: { name: string; to: string }[];
};

export const loader: LoaderFunction = () => {
  const data: IndexData = {
    routes: [
      {
        to: "characters",
        name: "Characters",
      },
      {
        to: "episodes",
        name: "Episodes",
      },
      {
        to: "locations",
        name: "Locations",
      },
    ],
  };

  return json(data);
};

export default function Index() {
  const { routes } = useLoaderData<IndexData>();

  return (
    <>
      <h2 className="text-xl font-bold text-sky-800">
        The Rick and Morty Guide
      </h2>

      <p className="mt-4">
        Uses the GraphQL API provided by the great folks at{" "}
        <a
          href="https://rickandmortyapi.com/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-sky-700 hover:underline"
        >
          The Rick and Morty API
        </a>
        .
      </p>

      <div className="mt-4">
        <ul className="space-y-2 sm:space-y-1">
          {routes.map(({ name, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="font-medium sm:py-1 text-sky-700 hover:underline"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
