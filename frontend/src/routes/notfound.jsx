/**
 * This page renders the 404 page of the application.
 * @author Filip Brebera w21020340
 */

import { Link, NotFoundRoute } from "@tanstack/react-router";
import { rootRoute } from "@routes/__root";

import sadFace from "@assets/sad-face.svg";

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-[590px] flex flex-col justify-center items-center px-10">
      <img src={sadFace} className="w-20 md:w-32 mb-8"></img>
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        This page does not exist :(
      </h1>
      <Link to={"/kf6012/coursework/frontend/home"} className="mt-5">
        Go back to home
      </Link>
    </div>
  );
}
