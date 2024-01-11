/**
 * This page renders the datatable with contents.
 * It uses tanstack table to handle logic behind the table and all pagination and data filtering is done on the server-side.
 * @author Filip Brebera w21020340
 */

import { useEffect, useState } from "react";

import { Route } from "@tanstack/react-router";
import { rootRoute } from "@routes/__root";
import { useDataTable } from "@hooks/useDataTable";
import { useApi } from "@hooks/useApi";
import { columns } from "@utils/dataTable";

import {
  getContent,
  getContentTypes,
  setContentTypes,
  setContent,
} from "@stores/data";

import ContentTable from "@components/core/content/ContentTable";
import Pagination from "@components/core/content/Pagination";
import TypeSelector from "@components/core/content/TypeSelector";

export const contentRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/kf6012/coursework/frontend/content/",
  component: Content,
  beforeLoad: () => fetchContent(),
});

// fetch content and content types
const fetchContent = async () => {
  // fetch content an content types if not already fetched
  if ((await getContent().length) > 0) return;
  setContent(
    await useApi().fetchContent({
      page: 1,
      limit: 20,
    })
  );
};

export default function Content() {
  const [cTypes, setCTypes] = useState([]);
  const {
    table,
    headerGroups,
    canPreviousPage,
    canNextPage,
    setPage,
    nextPage,
    data,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    loading,
    contentType,
    setContentTypeFilter,
  } = useDataTable({ columns });

  // fetch content types if not already fetched
  useEffect(() => {
    if (getContentTypes().length < 1)
      useApi()
        .fetchContentTypes()
        .then((res) => {
          // i need this to be able render it - reactivity is not working
          setCTypes(res);
          setContentTypes(res);
        });
    else setCTypes(getContentTypes());
    return () => {};
  }, []);

  return (
    <div className="px-[5%] md:px-10 mt-10">
      <h1 className="text-2xl md:text-3xl font-bold">Content List</h1>
      <p className="text-gray-500 mt-2">
        List of contents in the Conference on Human Factors in Computing
        Systems. Hover over title to see details.
      </p>
      <hr className="my-5"></hr>

      <TypeSelector
        contentType={contentType}
        setContentTypeFilter={setContentTypeFilter}
        setPage={setPage}
        types={cTypes}
      ></TypeSelector>

      <ContentTable
        table={table}
        headerGroups={headerGroups}
        loading={loading}
        data={data}
      ></ContentTable>

      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPage={setPage}
      ></Pagination>
    </div>
  );
}
