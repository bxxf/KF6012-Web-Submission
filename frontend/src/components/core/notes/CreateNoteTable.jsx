/**
 * This is a component that renders a table of content in the notes dialog
 * @author Filip Brebera w21020340
 * @param {*} param0
 * @param {object} param0.table
 * @param {object} param0.headerGroups
 * @returns
 */

import { flexRender } from "@tanstack/react-table";

export default function CreateNoteTable({ table, headerGroups }) {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[500px] mt-3">
      <table className="divide-y divide-gray-200 md:w-[100%] table-fixed ">
        <thead className="bg-gray-50 rounded-lg">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={column.column.id + index}
                  style={{
                    width: `${column.column.columnDef.size}%`,
                  }}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider]"
                >
                  {column.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...table.getBodyProps}
          className="bg-white divide-y divide-gray-200"
        >
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    style={{
                      width: `${cell.column.columnDef.size}%`,
                    }}
                    className="px-4 py-4 whitespace-nowrap text-xs text-gray-500 text-ellipsis overflow-hidden"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
