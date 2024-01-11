/**
 * This component is used to render the pagination controls in the content page, it uses the tanstack table hooks to control the pagination.
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {boolean} param0.canPreviousPage
 * @param {boolean} param0.canNextPage
 * @param {function} param0.previousPage
 * @param {function} param0.nextPage
 * @param {function} param0.setPageSize
 * @param {number} param0.pageIndex
 * @param {number} param0.pageSize
 * @param {function} param0.setPage
 */
export default function Pagination({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  setPageSize,
  pageIndex,
  pageSize,
  setPage,
}) {
  return (
    <div className="flex justify-between mt-6 py-2 bg-gray-100 py-3 px-4 rounded-lg text-sm">
      <div className="flex gap-x-2">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={
            canPreviousPage
              ? "cursor-pointer"
              : "cursor-not-allowed text-gray-300"
          }
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={
            canNextPage ? "cursor-pointer" : "cursor-not-allowed text-gray-300"
          }
        >
          Next
        </button>
      </div>
      <div>
        Current: Page <strong>{pageIndex + 1}</strong>
        <span className="mx-3">|</span>
        <select
          value={pageSize}
          className="bg-transparent"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            // reset page to 0 when changing page size to avoid errors
            setPage(0);
          }}
        >
          {[10, 20, 30, 40, 50].map((ps) => (
            <option key={ps} value={ps}>
              Show {ps}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
