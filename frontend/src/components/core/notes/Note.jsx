/**
 * This component renders a single note in the notes list
 * It allows the user to edit or delete the note
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {object} param0.note
 * @param {function} param0.setNoteToEdit
 * @param {function} param0.setUpdateNoteDialogOpen
 * @param {function} param0.removeNote
 * @param {number} param0.notesLength
 */

import TrashIcon from "@components/shared/icons/TrashIcon";
import EditIcon from "@components/shared/icons/EditIcon";
import LoaderShimmer from "./ContentLoader";

import { getFullDirectory } from "@stores/data";

export default function Note({
  note,
  setNoteToEdit,
  setUpdateNoteDialogOpen,
  removeNote,
  notesLength,
}) {
  return (
    <div
      className="bg-gray-100 rounded-lg aspect-square max-w-[90vw] p-5 flex flex-col justify-end max-w-full md:max-w-[400px] relative w-full "
      style={{
        minWidth: notesLength < 4 ? "400px" : "auto",
        minHeight: notesLength < 4 ? "400px" : "auto",
      }}
      key={note.id}
    >
      <div className="absolute right-0 top-0 p-4 text-xs flex gap-x-3 text-gray-800">
        <button onClick={() => removeNote(note)} className="cursor-pointer">
          <TrashIcon></TrashIcon>
        </button>
        <button
          onClick={() => {
            setNoteToEdit(note);
            setUpdateNoteDialogOpen(true);
          }}
        >
          <EditIcon></EditIcon>
        </button>
      </div>

      <span className="block text-lg mb-4 text-gray-600">
        {getFullDirectory().find((c) => c.content_id === note.content_id)
          ?.content_title ?? <LoaderShimmer></LoaderShimmer>}
      </span>
      <hr className="mb-4" />
      <span className="block text-sm font-medium text-gray-500">My Note: </span>
      <span className="block">{note.text}</span>
    </div>
  );
}
