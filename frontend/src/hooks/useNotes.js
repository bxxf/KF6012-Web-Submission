import { useApi } from "@hooks/useApi";
import { useState } from "react";
import { toast } from "sonner";
import { getNotes, setNotes } from "@stores/data";

export const useNotes = ({
  closeModal,
  note,
  removeSelected,
  setHidden,
  selectedItem,
  initialNote,
}) => {
  const maxLength = 250;
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

  return {
    noteText,
    setNoteText,
    error,
    setError,
    loading,
    setLoading,
    createNote,
    updateNote,
    preventLength,
    maxLength,
  };
};
