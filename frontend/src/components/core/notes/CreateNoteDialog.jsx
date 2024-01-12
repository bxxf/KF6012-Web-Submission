/**
 * This component renders the create note dialog
 * It allows the user to create a note and select the content from the react-table to add the note to
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {boolean} param0.isOpen
 * @param {function} param0.setIsOpen
 */

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useDataTable } from "@hooks/useDataTable";
import { dialogColumns as columns } from "@utils/dialogColumns";
import { subscribeFullDirectory } from "@stores/data";

import CloseIcon from "@components/shared/icons/CloseIcon";

import CreateNoteTable from "./CreateNoteTable";
import CreateNoteBody from "./CreateNoteBody";
import CreateNoteSearch from "./CreateNoteSearch";

export default function CreateNoteDialog({ isOpen, setIsOpen }) {
  const {
    table,
    headerGroups,
    setRowSelection,
    setData,
    selectedItem,
    setSearchTerm,
    setSelectedItem,
    setHidden,
    hidden,
  } = useDataTable({
    columns,
    dialog: true,
  });

  const [hideItem, setHideItem] = useState(false);

  // if item is selected hide the list of contents
  useEffect(() => {
    if (selectedItem) {
      setHideItem(true);
    }
  }, [selectedItem]);

  // another reactivity issue fix - subscribe to the full directory to get the latest data and rerender
  useEffect(() => {
    subscribeFullDirectory((data) => {
      setData(data);
    });
  });
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

              {selectedItem && (
                <button
                  className="absolute top-7 left-0 pl-10 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(undefined);
                    setRowSelection({});
                    setTimeout(() => {
                      setHideItem(false);
                      // wait 400ms for animation to finish
                    }, 400);
                  }}
                >
                  Back to list
                </button>
              )}
              {/* If item is not selected show list of contents */}

              <AnimatePresence>
                {!hideItem && (
                  <div>
                    {!selectedItem && (
                      <motion.div
                        key="item-unselected"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.1,
                          type: "tween",
                        }}
                      >
                        <div>
                          <Dialog.Title
                            className={`text-3xl font-bold mb-4 mt-4`}
                          >
                            Create new Note
                          </Dialog.Title>
                          <Dialog.Description className="text-gray-500 mb-8">
                            Search for content you would like to add note to and
                            select it to add your note.
                          </Dialog.Description>
                          <div>
                            <CreateNoteSearch setSearchTerm={setSearchTerm} />
                            <CreateNoteTable
                              table={table}
                              headerGroups={headerGroups}
                            />
                            {/* This button does not do anything, might delete it */}
                            <button className="mt-4 bg-black w-full text-white px-4 py-4 font-bold text-lg rounded-lg">
                              Select item
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
                {/* If item is selected show note creation form */}
                {selectedItem && (
                  <motion.div
                    key="item-selected"
                    initial={{ opacity: 0, transform: "translateX(-20%)" }}
                    animate={{ opacity: 1, transform: "translateX(0)" }}
                    exit={{ opacity: 0, transform: "translateX(-20%)" }} // Slide to the right on exit
                    transition={{
                      delay: 0.2,
                      duration: 0.2,
                      type: "tween",
                      ease: "easeInOut",
                    }}
                  >
                    <CreateNoteBody
                      closeModal={() => setIsOpen(false)}
                      selectedItem={selectedItem}
                      setHidden={setHidden}
                      hidden={hidden}
                      removeSelected={() => {
                        setSelectedItem(undefined);
                        setRowSelection({});
                        setHideItem(false);
                      }}
                    ></CreateNoteBody>
                  </motion.div>
                )}
              </AnimatePresence>
            </Dialog.Panel>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
