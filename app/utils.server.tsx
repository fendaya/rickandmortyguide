// Sometimes some modules don't work in the browser, Remix will generally be
// able to remove server-only code automatically as long as you don't import it
// directly from a route module (that's where the automatic removal happens). If
// you're ever still having trouble, you can skip the remix remove-server-code
// magic and drop your code into a file that ends with `.server` like this one.
// Remix won't even try to figure things out on its own, it'll just completely
// ignore it for the browser bundles. On a related note, crypto can't be
// imported directly into a route module, but if it's in this file you're fine.
import { createHash } from "crypto";

export function hash(str: string) {
  return createHash("sha1").update(str).digest("hex").toString();
}

const createFetcher =
  (url: string) =>
  async (body: { query: string; variables?: Record<string, any> }) => {
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

export const fetcher = createFetcher("https://rickandmortyapi.com/graphql");
