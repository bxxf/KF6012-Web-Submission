/**
 * This component renders mobile navbar drawer. It is used in all pages.
 * It uses headlessui Dialog component and framer-motion for animations.
 * @param {object} param0
 * @param {boolean} param0.isOpen
 * @param {function} param0.setIsOpen
 * @source https://headlessui.dev/react/dialog
 * @source https://www.framer.com/docs/animate-presence/
 */

import { Dialog } from "@headlessui/react";

import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import { routes } from "@utils/navbarRoutes";
import { getUser } from "@stores/auth";
import { useLogin } from "@hooks/useLogin";

export default function NavbarDrawer({ isOpen, setIsOpen }) {
  const { navigate } = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, type: "tween", ease: "easeInOut" }}
        >
          <div className="fixed inset-0 w-screen">
            <Dialog.Panel className="bg-black w-full h-full px-5  py-16">
              <button
                className="bg-transparent fixed right-0 top-0 w-20 h-20"
                onClick={() => setIsOpen(false)}
              ></button>

              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-y-6 mt-10">
                  {routes.left.map((link) => (
                    <Link
                      onClick={() => setIsOpen(false)}
                      activeProps={{
                        className: "text-blue-300",
                      }}
                      to={link.route}
                      className="text-2xl text-white"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                {/* Sign in button */}
                {!getUser()?.email ? (
                  <Link
                    to="/kf6012/coursework/frontend/login"
                    onClick={() => setIsOpen(false)}
                    activeProps={{
                      className: "hidden",
                    }}
                    className="bg-white text-black py-3 px-4 rounded-lg text-center font-bold"
                  >
                    Sign In
                  </Link>
                ) : (
                  <div className="w-full">
                    <div className="text-white text-xl mb-6">
                      {getUser().name}
                    </div>
                    <button
                      className="bg-white text-black py-3 px-4 rounded-lg text-center font-bold w-full"
                      onClick={() => {
                        setIsOpen(false);
                        useLogin().logOut();
                        navigate("/kf6012/coursework/frontend/login");
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
