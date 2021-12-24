import { useEffect, useRef } from "react";
import { Form } from "remix";
import { SearchIcon } from "@heroicons/react/solid";

export default function SearchForm({ term }: { term?: string }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.value = term;
    }
  }, [term]);

  return (
    <Form method="get" className="p-4 rounded-lg bg-gray-200">
      <div className="relative flex-auto flex">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="w-6 h-6 text-gray-500" />
        </div>
        <label className="flex-auto">
          <span className="sr-only">Term</span>
          <input
            ref={ref}
            type="text"
            name="term"
            placeholder="Search..."
            autoComplete="off"
            className="w-full pl-10 pr-3 py-2 focus:outline-none focus:ring-4 focus:ring-slate-400 focus:ring-opacity-30 rounded-md bg-gray-50"
          />
        </label>
      </div>
    </Form>
  );
}
