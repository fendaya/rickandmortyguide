import { Form } from "remix";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import Button from "../Button";

export default function ListNav({
  info,
}: {
  info: {
    count: number;
    page: number;
    pages: number;
    term: string;
  };
}) {
  const limit = 20;
  const isFirstPage = info.page === 1;
  const isLastPage = info.page === info.pages;
  const startIndex = (info.page - 1) * limit + 1;
  const endIndex = Math.min(info.page * limit, info.count);

  return (
    <Form method="get" className="flex items-center justify-between">
      <div className="text-lg font-bold">
        Displaying {startIndex} to {endIndex} of {info.count}
      </div>
      <div className="flex justify-end space-x-1">
        <input type="hidden" name="term" value={info.term} />
        {/* Add "pointer-events-none" class to icons to fix issues where the button value is not serialized during submit. */}
        <Button
          type="submit"
          name="page"
          value={1}
          aria-label="Go to first page"
          disabled={isFirstPage}
          icon={
            <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-800 pointer-evants-none" />
          }
        ></Button>
        <Button
          type="submit"
          name="page"
          value={Math.max(1, info.page - 1)}
          aria-label="Go to previous page"
          disabled={isFirstPage}
          icon={
            <ChevronLeftIcon className="w-5 h-5 text-gray-800 pointer-events-none" />
          }
        ></Button>
        <Button
          type="submit"
          name="page"
          value={Math.min(info.page + 1, info.pages)}
          aria-label="Go to next page"
          disabled={isLastPage}
          icon={
            <ChevronRightIcon className="w-5 h-5 text-gray-800 pointer-events-none" />
          }
        ></Button>
        <Button
          type="submit"
          name="page"
          value={info.pages}
          aria-label="Go to last page"
          disabled={isLastPage}
          icon={
            <ChevronDoubleRightIcon className="w-5 h-5 text-gray-800 pointer-events-none" />
          }
        ></Button>
      </div>
    </Form>
  );
}
