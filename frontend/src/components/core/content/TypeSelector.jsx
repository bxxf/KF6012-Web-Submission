/**
 * This component is used to render the content type selector in the content page, it uses the tanstack table hooks to control the paginatio and filters.
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {string} param0.contentType
 * @param {function} param0.setContentTypeFilter
 * @param {function} param0.setPage
 * @param {object[]} param0.types
 */
export default function TypeSelector({
  contentType,
  setContentTypeFilter,
  setPage,
  types,
}) {
  return (
    <select
      value={contentType}
      className="py-3 px-3 rounded-lg border-[1px] border-gray-300 w-full mb-5"
      onChange={(e) => {
        // reset page to 0 when changing content type to avoid errors
        setPage(0);
        setContentTypeFilter(e.target.value === "all" ? null : e.target.value);
      }}
    >
      <option value="all">All Content Types</option>
      {types.map((contentType) => (
        <option key={contentType?.id} value={contentType?.id}>
          {contentType?.name}
        </option>
      ))}
    </select>
  );
}
