/**
 * This page renders the notes taken by the user. It also allows adding and editing existing notes via modal.
 * @author Filip Brebera w21020340
 */

import { useEffect, useState } from "react";

import { rootRoute } from "./__root";
import { Route, redirect } from "@tanstack/react-router";
import { fetchNotes } from "@utils/fetchNotes";

import { toast } from "sonner";

import {
  getFullDirectory,
  getNotes,
  setFullDirectory,
  setNotes,
} from "@stores/data";

import { useApi } from "@hooks/useApi";
import { getUser } from "@stores/auth";

import { AnimatePresence, motion } from "framer-motion";

import Note from "@components/core/notes/Note";
import CreateNoteDialog from "@components/core/notes/CreateNoteDialog";
import UpdateNoteDialog from "@components/core/notes/UpdateNoteDialog";

export const notesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/kf6012/coursework/frontend/notes/",
  component: Notes,
  beforeLoad: () => {
    if (!getUser()?.email)
      return redirect({
        to: "/kf6012/coursework/frontend/login",
      });
  },
  loader: async () => await fetchNotes(),
});

const variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

export default function Notes() {
  const [rerender, setRerender] = useState();
  const [addNoteDialogOpen, setAddNoteDialogOpen] = useState(false);
  const [updateNoteDialogOpen, setUpdateNoteDialogOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [hidden, setHidden] = useState({});

  const removeNote = (note) => {
    setHidden({
      ...hidden,
      [note.id]: true,
    });
    useApi()
      .deleteNote({
        noteId: note.id,
      })
      .then((res) => {
        // set notes to the current state without the deleted note
        setNotes(getNotes().filter((n) => n.id !== note.id));
        toast.success("Note deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        setHidden({
          ...hidden,
          [note.id]: false,
        });
      });
  };

  useEffect(() => {
    if (getNotes().length < 1)
      useApi()
        .fetchNotes()
        .then((res) => {
          setNotes(res);
          // I hate react, why do i need to do this to trigger rerender manually
          setRerender(true);
        });
    if (getFullDirectory().length < 1)
      useApi()
        .fetchContent()
        .then((res) => {
          setFullDirectory(res);
          setRerender(false);
        });

    // trigger rerender
  }, []);

  return (
    <div className="px-[5%] md:px-10 mt-10 min-h-[600px]">
      <h1 className="text-2xl md:text-3xl font-bold">My Notes</h1>
      <p className="text-gray-500 mt-2">
        Here you can find all the notes you have taken.
      </p>
      <hr className="my-5"></hr>
      <AnimatePresence>
        {/* Render notes */}
        <ul
          className={`gap-5 ${
            getNotes()?.length < 4 ? "flex flex-wrap " : "grid"
          }`}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300PX, 1fr))",
          }}
        >
          {getNotes()?.map((note, index) => (
            <motion.li
              key={index}
              initial="hidden"
              animate="visible"
              style={{
                display: hidden[note?.id] ? "none" : "block",
              }}
              exit="hidden"
              variants={variants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {!hidden[note?.id] && (
                <Note
                  note={note}
                  removeNote={removeNote}
                  key={index}
                  setNoteToEdit={setNoteToEdit}
                  setUpdateNoteDialogOpen={setUpdateNoteDialogOpen}
                  notesLength={getNotes().length}
                ></Note>
              )}
            </motion.li>
          ))}
          {/* Add new note button */}
          <button
            className="bg-gray-100 rounded-lg aspect-square max-w-[90vw] text-[12rem] text-gray-300 flex flex-col items-center justify-center text-center hover:bg-gray-200 transition-all cursor-pointer max-w-full w-full md:max-w-[400px] min-w-[300px]"
            onClick={() => setAddNoteDialogOpen(true)}
          >
            <span>+</span>
            <span className="text-2xl font-bold -mt-6">Add new note</span>
          </button>
          {/* New note dialog */}
          <CreateNoteDialog
            isOpen={addNoteDialogOpen}
            setIsOpen={setAddNoteDialogOpen}
            setHidden={setHidden}
          />
          <UpdateNoteDialog
            note={noteToEdit}
            isOpen={updateNoteDialogOpen}
            setIsOpen={setUpdateNoteDialogOpen}
            selectedItem={
              noteToEdit
                ? getFullDirectory()?.find(
                    (c) => c?.content_id === noteToEdit?.content_id
                  )
                : null
            }
          ></UpdateNoteDialog>
        </ul>
      </AnimatePresence>
    </div>
  );
}
