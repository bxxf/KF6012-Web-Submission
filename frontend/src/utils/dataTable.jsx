/**
 * Data table columns definition
 * @author Filip Brebera w21020340
 */

import { createColumnHelper } from "@tanstack/react-table";
import { getContentTypes } from "@stores/data";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("content_title", {
    header: "Content Title",
    cell: (info) => {
      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className="font-bold cursor-grab">{info.getValue()}</span>,
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="w-[380px] max-w-[90vw] p-2">
              <p className="text-lg font-bold text-gray-700 whitespace-normal mb-1">
                {info.row.original.content_title}
              </p>
              <p className="text-xs text-gray-600 whitespace-normal mb-2 font-bold mb-2">
                {info.row.original.author_name}, {info.row.original.country},{" "}
                {info.row.original.city}
              </p>
              <p className="text-xs text-gray-600 whitespace-normal">
                {info.row.original.content_abstract}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
    size: 6,
  }),
  columnHelper.accessor("author_name", {
    header: "Author Name",
    cell: (info) => info.getValue(),
    size: 2,
  }),
  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
    size: 2,
  }),
  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => info.getValue(),
    size: 2,
  }),
  columnHelper.accessor("institution", {
    header: "Institution",
    cell: (info) => info.getValue(),
    size: 4,
  }),
  columnHelper.accessor("content_type", {
    header: "Content Type",
    size: 2,
    // render content type as badge and fetch it from the table of content types with ids
    cell: (info) =>
      getContentTypes()?.find(
        (contentType) => contentType.id === info.getValue()
      )?.name ?? info.getValue(),
  }),
  columnHelper.accessor("awards", {
    header: "Awards",
    size: 3,
    cell: (info) =>
      info.getValue()?.length > 0 ? (
        <span className="font-bold py-1 px-4 bg-yellow-100 text-yellow-800 rounded-lg">
          {info.getValue()}
        </span>
      ) : (
        <></>
      ),
  }),
];
