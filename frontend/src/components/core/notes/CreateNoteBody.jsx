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

import { Dialog } from "@headlessui/react";
import { useApi } from "@hooks/useApi";
import { useState } from "react";
import { getNotes, setNotes } from "@stores/data";

import { toast } from "sonner";

export default function CreateNoteBody({
  selectedItem,
  closeModal,
  removeSelected,
  note = undefined,
  setHidden,
}) {
  const maxLength = 250;

  // get the initial note text from the note prop if it exists, otherwise get it from the notes store
  const initialNote =
    note?.text ??
    getNotes()?.find((note) => note.content_id === selectedItem.content_id)
      ?.text ??
    "";

  // get the initial note id from the note prop if it exists, otherwise get it from the notes store
  const initialNoteId =
    note?.id ??
    getNotes().find((note) => note.content_id === selectedItem.content_id)?.id;

  // set the initial note text to the initial note
  const [noteText, setNoteText] = useState(initialNote);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // create a new note by sending a request to the api
  const createNote = () => {
    setError("");
    useApi()
      .createNote({
        note: noteText,
        contentId: selectedItem.content_id,
      })
      .then(async (res) => {
        if (res.status === 200) {
          const data = (await res.json()).note;
          closeModal();
          removeSelected();
          // we can reset hidden as anyways note got refetched
          setHidden({});

          // add note to the current state so it is visible immediately
          setNotes([...getNotes(), data]);

          // add note to the current sta
          toast.success("Note created successfully");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  // update an existing note by sending a request to the api
  const updateNote = () => {
    setError("");
    useApi()
      .updateNote({
        note: noteText,
        noteId: initialNoteId,
      })
      .then(async (res) => {
        if (res.status === 200) {
          const data = (await res.json()).note;
          // update note in the current state so it is visible immediately
          setNotes(
            getNotes().map((note) => {
              if (note.id === data.note_id) {
                return { ...note, ...data };
              }
              return note;
            })
          );
          closeModal();
          removeSelected();
          toast.success("Note updated successfully");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // prevent the user from typing more than maxLength characters
  const preventLength = (e) => {
    if (e.target.value.length > maxLength - 1) {
      if (e.key !== "Backspace") {
        e.preventDefault();
        setError(`Note cannot be longer than ${maxLength} characters`);
      }
      if (e.target.value.length > maxLength)
        e.target.value = e.target.value.substring(0, maxLength);
    } else {
      setError("");
    }
    setNoteText(e.target.value);
  };

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
