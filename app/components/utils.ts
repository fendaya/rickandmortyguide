export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const fetcher = async (
  url: string,
  body: { query: string; variables?: Record<string, any> }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(body),
  });

  const { data, errors } = await response.json();
  if (!response.ok) {
    return Promise.reject(errors);
  }

  return data;
};

const createFetcher =
  (url: string) => (body: { query: string; variables?: Record<string, any> }) =>
    fetcher(url, body);

export const rmFetcher = createFetcher("https://rickandmortyapi.com/graphql");

export const toQueryString = (o: {}) =>
  Object.entries(o)
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
