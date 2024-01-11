import { flexRender } from "@tanstack/react-table";

/**
 * This component is used to render the content table in the content page, it uses the flexRender function from tanstack/react-table to render the content of the cells.
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {object} param0.table
 * @param {object} param0.headerGroups
 * @param {array} param0.data
 * @param {boolean} param0.loading
 */

export default function ContentTable({ table, headerGroups, data, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="divide-y divide-gray-200 md:w-[100%] table-fixed ">
        <thead className="bg-gray-50 rounded-lg">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={column.column.id + index}
                  style={{ width: `${column.column.columnDef.size}%` }}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider]"
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
          {loading === false && data.length < 1 ? (
            <tr>
              <td
                colSpan={headerGroups[0].headers.length}
                className="text-center text-gray-500 py-10"
              >
                No content to show
              </td>
            </tr>
          ) : (
            loading === true &&
            data.length < 1 && (
              <tr>
                <td
                  colSpan={headerGroups[0].headers.length}
                  className="text-center text-gray-500 py-10"
                >
                  Loading..
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
