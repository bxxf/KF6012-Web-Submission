/**
 * Data table columns definition for dialog content selection
 * @author Filip Brebera w21020340
 */

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const dialogColumns = [
  columnHelper.accessor("selector", {
    header: "Select",
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="focus:ring-blue-500"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 0.8,
  }),
  columnHelper.accessor("content_title", {
    header: "Content",
    cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    size: 6,
  }),
  columnHelper.accessor("author_name", {
    header: "Author",
    cell: (info) => info.getValue(),
    size: 2,
  }),
];
