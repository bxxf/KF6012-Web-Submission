/**
 * This component renders the search bar to search the content by title in the notes dialog
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {function} param0.setSearchTerm
 * @returns
 */

import { useState } from "react";

export default function CreateNoteSearch({ setSearchTerm }) {
  const [debouncing, setDebouncing] = useState(false);
  const debounceSearch = (e) => {
    if (e.target.value === "") setSearchTerm("");
    if (debouncing) return;
    setDebouncing(true);
    setTimeout(() => {
      setSearchTerm(e.target.value);
      setDebouncing(false);
    }, 500);
  };
  return (
    <input
      type="text"
      onChange={debounceSearch}
      name="search"
      id="search"
      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-200  border-2 rounded-md py-4"
      placeholder="Search the content here.."
    />
  );
}
