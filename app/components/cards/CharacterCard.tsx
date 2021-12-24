import { Link } from "remix";
import type { Character } from "~/types";

export const CharacterCard = ({
  character: {
    id,
    name,
    status,
    species,
    gender,
    image,
    origin,
    location,
    episode,
  },
  isSummary = false,
}: {
  character: Character;
  isSummary?: boolean;
}) => {
  return (
    <div className="flex flex-col overflow-hidden border rounded-lg sm:flex-row border-slate-200 bg-gray-50">
      <div className="w-full sm:w-48 sm:flex-none">
        <img
          src={image}
          alt=""
          className="object-cover w-full h-48 sm:w-auto sm:h-full"
        />
      </div>
      <div className="flex-auto px-4 py-2">
        <Link
          to={`${id}`}
          className="text-lg font-bold text-sky-800 hover:underline"
        >
          {name}
        </Link>

        <p className="font-semibold text-gray-800">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              status === "Dead"
                ? "bg-red-500"
                : status === "Alive"
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></span>{" "}
          {status} - {species} {gender}
        </p>

        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">Origin:</p>
          {origin.id ? (
            <Link
              to={`/locations/${origin.id}`}
              className="text-gray-600 hover:text-sky-600 hover:underline"
            >
              {origin.name}
            </Link>
          ) : (
            <p className="text-gray-600">{origin.name}</p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">
            Last Known Location:
          </p>
          <Link
            to={`/locations/${location.id}`}
            className="text-gray-600 hover:text-sky-600 hover:underline"
          >
            {location.name}
          </Link>
        </div>
        {isSummary ? (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">
              First Seen In:
            </p>
            <Link
              to={`/episodes/${episode[0].id}`}
              className="text-gray-600 hover:text-sky-600 hover:underline"
            >
              {episode[0].name}
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700">Seen In:</p>

            <ul>
              {episode.map(({ id, episode, name }) => (
                <li key={id}>
                  <Link
                    to={`/episodes/${id}`}
                    className="text-gray-600 hover:text-sky-600 hover:underline"
                  >
                    {episode} - {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
