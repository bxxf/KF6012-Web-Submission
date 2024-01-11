/**
 * This component renders the update note dialog
 * @author Filip Brebera w21020340
 * @param {*} param0
 * @param {boolean} param0.isOpen
 * @param {object} param0.setIsOpen
 * @param {object} param0.selectedItem
 * @returns
 */

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import CloseIcon from "@components/shared/icons/CloseIcon";
import CreateNoteBody from "./CreateNoteBody";

export default function UpdateNoteDialog({
  isOpen,
  setIsOpen,
  selectedItem,
  note,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <AnimatePresence>
          {/* Modal Controls */}
          {open && (
            <Dialog.Panel
              className="mx-auto rounded-3xl bg-white px-10 py-16 w-full md:w-[700px] shadow-md max-h-[95vh] md:min-h-[750px] relative overflow-x-hidden transition-all"
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
            >
              <button
                className="absolute top-5 right-7 w-10 h-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <CloseIcon></CloseIcon>
              </button>

              <CreateNoteBody
                note={note}
                closeModal={() => setIsOpen(false)}
                selectedItem={selectedItem}
                removeSelected={() => {}}
              ></CreateNoteBody>
            </Dialog.Panel>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
