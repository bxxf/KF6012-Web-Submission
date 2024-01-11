/**
 * This is the root route of the application. It wraps all the routes and provides the layout for the application.
 * @author Filip Brebera w21020340
 */

import { Outlet, RootRoute, ScrollRestoration } from "@tanstack/react-router";
import { fetchToken } from "@utils/fetchToken";

import Footer from "@components/shared/Footer";
import Navbar from "@components/shared/Navbar";

import "@assets/main.css";
import { Toaster } from "sonner";

export const rootRoute = new RootRoute({
  component: RootComponent,
  beforeLoad: fetchToken,
});

function RootComponent() {
  return (
    <div className="font-sans">
      <Navbar></Navbar>
      <Outlet />
      <Toaster />
      {window.location.pathname.includes("login") ? null : <Footer></Footer>}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </div>
  );
}
