/**
 * This component renders the sign in dialog. It is used in all pages.
 * @author Filip Brebera w21020340
 * @source https://headlessui.dev/react/dialog
 */

import { useState } from "react";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import SignInDialogBody from "@components/shared/SignInDialogBody";

export default function SignInDialog({ isOpen, setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <AnimatePresence>
          {open && (
            <Dialog.Panel
              className="mx-auto rounded-3xl bg-white px-10 py-16 md:w-[500px] shadow-md"
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
            >
              <SignInDialogBody
                setLoading={setLoading}
                loading={loading}
                error={error}
                setError={setError}
                setIsOpen={setIsOpen}
              />
            </Dialog.Panel>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
