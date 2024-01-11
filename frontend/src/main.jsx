/**
 * This is the main entry point of the application.
 * It renders the application into the root element of the HTML page.
 * @author Filip Brebera w21020340
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, Router } from "@tanstack/react-router";

import { rootRoute } from "./routes/__root";
import { indexRoute } from "./routes";
import { notFoundRoute } from "./routes/notfound";
import { countriesRoute } from "./routes/countries";
import { contentRoute } from "./routes/content";
import { notesRoute } from "./routes/notes";
import { loginRoute } from "./routes/login";

const routeTree = rootRoute.addChildren([
  indexRoute,
  countriesRoute,
  contentRoute,
  notesRoute,
  loginRoute,
]);

const router = new Router({
  routeTree,
  notFoundRoute,
});

const rootElement = document.getElementById("root");

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
