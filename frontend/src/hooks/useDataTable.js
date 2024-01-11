import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { useApi } from "@hooks/useApi";
import { getContent, getFullDirectory } from "@stores/data";

/**
 * Defining the tanstack table logic here and returning parameters for rendering in the components
 * @author Filip Brebera w21020340
 * @param {object} props
 * @param {object} props.columns - columns object for the table
 * @param {boolean} props.dialog - whether the table is in a dialog or not
 * @return {object} object
 * @returns {object} object.table - the table object
 * @returns {function} object.setPage - function to set the page
 * @returns {object[]} object.headerGroups - the header groups for the table
 * @returns {object[]} object.rows - the rows for the table
 * @returns {boolean} object.canPreviousPage - whether the table can go to previous page
 * @returns {boolean} object.canNextPage - whether the table can go to next page
 * @returns {function} object.nextPage - function to go to next page
 * @returns {function} object.previousPage - function to go to previous page
 * @returns {function} object.setPageSize - function to set the page size
 * @returns {number} object.pageIndex - the current page index
 * @returns {number} object.pageSize - the current page size
 * @returns {boolean} object.loading - whether the table is loading
 * @returns {object[]} object.data - the data for the table
 * @returns {function} object.setData - function to set the data
 * @returns {function} object.setContentTypeFilter - function to set the content type filter
 * @returns {string} object.contentTypeFilter - the current content type filter
 * @returns {object} object.rowSelection - the current row selection
 * @returns {function} object.setRowSelection - function to set the row selection
 * @returns {object} object.selectedItem - the current selected item
 * @returns {function} object.setSelectedItem - function to set the selected item
 * @returns {string} object.searchTerm - the current search term
 * @returns {function} object.setSearchTerm - function to set the search term
 */
export const useDataTable = ({ columns, dialog = false }) => {
  const [data, setData] = useState(getContent());
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(100);
  const [initialized, setInitialized] = useState(true);
  const [contentTypeFilter, setContentTypeFilter] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(undefined);

  const fetchIdRef = useRef(0);

  const initialState = {
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
    filters: {
      contentType: contentTypeFilter,
      searchTerm: searchTerm,
    },
  };
  // Define the table and initial state
  const table = useReactTable({
    columns,
    data,
    initialState,
    enableRowSelection: dialog,
    enableMultiRowSelection: false,
    manualPagination: true,
    manualFilters: true,
    pageCount,
    state: {
      rowSelection,
    },
    // redefine row selection so we return the selected item
    onRowSelectionChange: (rowSelection) => {
      setRowSelection(rowSelection());

      if (data.length === 0 || rowSelection() === undefined) return;

      // find the selected item
      const index = Object.keys(rowSelection()).find(
        (key) => rowSelection()[key] === true
      );

      const item = data[index];
      setSelectedItem(item);

      // reset search term on selection
      setSearchTerm("");
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Fetch data from server
  const fetchServerData = useCallback(async () => {
    setLoading(true);

    const fetchId = ++fetchIdRef.current;

    if (fetchId === fetchIdRef.current) {
      try {
        const result = await useApi().fetchContent({
          page: table.getState().pagination.pageIndex + 1,
          limit: table.getState().pagination.pageSize,
          contentType: contentTypeFilter,
        });
        if (result.length === 0) {
          table.previousPage();
          setPageCount(table.getState().pagination.pageIndex);
        }
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    contentTypeFilter,
  ]);

  // On page size change, reset page count
  useEffect(() => {
    setPageCount(100);
  }, [table.getState().pagination.pageSize]);

  useEffect(() => {
    if (dialog) {
      setData(getFullDirectory());
      return () => {};
    }
    // skip first render as it gets fetched in the loader of route
    if (
      initialState.pagination.pageSize ===
        table.getState().pagination.pageSize &&
      initialState.pagination.pageIndex ===
        table.getState().pagination.pageIndex &&
      contentTypeFilter === initialState.filters.contentType &&
      initialized == true
    ) {
      setInitialized(false);
      return;
    }

    fetchServerData();
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
    contentTypeFilter,
  ]);

  // handle search in dialog
  useEffect(() => {
    if (searchTerm === "") setData(getFullDirectory());

    if (searchTerm !== "" && searchTerm !== undefined && dialog === true)
      useApi()
        .fetchContent({
          searchTerm: searchTerm,
        })
        .then((data) => {
          setData(data);
        })
        .catch((err) => console.log(err));
  }, [searchTerm]);

  return {
    table,
    setPage: table.setPageIndex,
    headerGroups: table.getHeaderGroups(),
    rows: table.getPaginationRowModel().rows,
    canPreviousPage: table.getCanPreviousPage(),
    canNextPage: table.getCanNextPage(),
    nextPage: table.nextPage,
    previousPage: table.previousPage,
    setPageSize: table.setPageSize,
    pageIndex: table.getState().pagination.pageIndex,
    pageSize: table.getState().pagination.pageSize,
    loading,
    data,
    setData,
    setContentTypeFilter,
    contentTypeFilter,
    rowSelection,
    setRowSelection,
    selectedItem,
    setSelectedItem,
    searchTerm,
    setSearchTerm,
    setPageCount,
  };
};
