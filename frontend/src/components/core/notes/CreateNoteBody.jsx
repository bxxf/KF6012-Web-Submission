/**
 * This component renders the body of the create note dialog
 * It allows the user to create or update a note
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {object} param0.selectedItem
 * @param {function} param0.closeModal
 * @param {function} param0.removeSelected
 * @param {object} param0.note
 */

import { useNotes } from "@/hooks/useNotes";
import { Dialog } from "@headlessui/react";

import { getNotes } from "@stores/data";

export default function CreateNoteBody({
  selectedItem,
  closeModal,
  removeSelected,
  note,
  setHidden,
}) {
  // get the initial note text from the note prop if it exists, otherwise get it from the notes store
  const initialNote =
    note?.text ??
    getNotes()?.find((note) => note.content_id === selectedItem.content_id)
      ?.text ??
    "";

  // extracted logic to hook
  const {
    noteText,
    error,
    loading,
    setLoading,
    createNote,
    updateNote,
    preventLength,
    maxLength,
  } = useNotes({
    initialNote,
    selectedItem,
    closeModal,
    removeSelected,
    setHidden,
    selectedItem,
    initialNote,
  });

  return (
    <div>
      <Dialog.Title className={`text-xl md:text-3xl font-bold mb-4`}>
        {selectedItem.content_title}
      </Dialog.Title>
      <Dialog.Description className="text-gray-500 mb-8 text-sm md:text-base">
        {selectedItem.content_abstract}
      </Dialog.Description>
      <hr />
      <h2 className="mt-6 font-bold text-lg">My Note:</h2>
      <textarea
        value={noteText}
        className="mt-3 w-full h-40 border-2 border-gray-200 rounded-lg p-4
      "
        onKeyDown={preventLength}
        onChange={preventLength}
      ></textarea>
      <div className="text-gray-500 text-sm mt-2">
        {noteText.length}/{maxLength}
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <button
        disabled={noteText.length >= maxLength || loading}
        className={`mt-4 bg-black text-white px-4 py-2 rounded-lg ${
          loading && "opacity-50 cursor-not-allowed"
        } ${noteText.length >= maxLength && "opacity-50 cursor-not-allowed"} `}
        onClick={() => {
          setLoading(true);
          if (initialNote) {
            updateNote();
          } else {
            createNote();
          }
        }}
      >
        {!loading ? (
          <span>{initialNote ? "Update" : "Create"} Note</span>
        ) : (
          <span>Loading...</span>
        )}
      </button>
    </div>
  );
}
