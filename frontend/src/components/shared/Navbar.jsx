/**
 * This component renders the navbar. It is used in all pages.
 * It also renders the SignInDialog component via portal.
 * It also renders the NavbarDrawer component via portal.
 * @author Filip Brebera w21020340
 */

import { useState } from "react";

import { Link, useNavigate } from "@tanstack/react-router";
import { createPortal } from "react-dom";

import { getUser, subscribeUser } from "@stores/auth";
import { useLogin } from "@hooks/useLogin";
import { routes } from "@utils/navbarRoutes";

import SignInDialog from "@components/shared/SignInDialog";
import NavbarDrawer from "@components/shared/NavbarDrawer";
import Hamburger from "hamburger-react";

export default function Navbar() {
  // states for dialogs - drawer and sign in dialog
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { logOut } = useLogin();

  // subscribe to user changes
  const [user, setUser] = useState(getUser());
  subscribeUser(setUser);

  const navigate = useNavigate();

  return (
    <nav className="flex justify-between md:grid px-[5%] md:px-10 py-6 md:grid-cols-3 items-center">
      <div className="gap-x-2 items-center md:flex hidden">
        {routes.left.map((route) => (
          <Link
            key={route.name}
            className="hover:bg-gray-100 bg-opacity-80 py-2 px-4 transition-all rounded-full text-sm cursor-pointer"
            activeProps={{
              className: "text-blue-900 hover:bg-transparent font-medium",
            }}
            to={route.route}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <div className="font-bold text-center text-gray-400">
        Filip Brebera <span className="hidden lg:inline">{"<w21020340>"}</span>
      </div>
      <div className="md:hidden fixed right-5 z-10">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          color={isOpen ? "white" : "black"}
        />
      </div>
      <div className="md:block hidden">
        <div className="flex justify-end gap-x-8 items-center">
          {!user?.email ? (
            /* not logged in menu */
            <div>
              <Link
                to="/kf6012/coursework/frontend/login"
                activeProps={{
                  className: "hidden",
                }}
                className="bg-black text-white py-2 px-7 rounded-full text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  setDialogIsOpen(true);
                }}
              >
                Sign In
              </Link>
              {/* Use portal to render the dialog outside of the navbar */}
              {createPortal(
                <SignInDialog
                  isOpen={dialogIsOpen}
                  setIsOpen={setDialogIsOpen}
                ></SignInDialog>,
                document.getElementById("root")
              )}
            </div>
          ) : (
            /* logged in menu */
            <>
              <Link
                to="/kf6012/coursework/frontend/notes/"
                className="text-sm bg-yellow-100 py-2 px-3 rounded-full text-yellow-800"
                activeProps={{
                  className: "!bg-transparent !text-blue-900 font-medium",
                }}
              >
                Notes
              </Link>
              <span className="text-sm hidden lg:inline">{user?.name}</span>
              <button
                className="text-sm"
                onClick={() => {
                  logOut();
                  navigate("/kf6012/coursework/frontend/login");
                }}
              >
                Log Out
              </button>
            </>
          )}
        </div>
        {createPortal(
          <NavbarDrawer isOpen={isOpen} setIsOpen={setIsOpen}></NavbarDrawer>,
          document.getElementById("root")
        )}
      </div>
    </nav>
  );
}
