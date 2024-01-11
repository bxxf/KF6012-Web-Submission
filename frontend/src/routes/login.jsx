/**
 * This route renders the login page of the application.
 * It uses the useLogin hook to login the user.
 * @author Filip Brebera w21020340
 */

import { useState } from "react";
import { Route, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "@routes/__root";

import { useLogin } from "@hooks/useLogin";
import { subscribeUser } from "@stores/auth";

import SignInDialogBody from "@components/shared/SignInDialogBody";

export const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/kf6012/coursework/frontend/login",
  component: Login,
});

function Login() {
  const { login } = useLogin();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  subscribeUser((user) => {
    if (user.email) {
      navigate({
        to: "/kf6012/coursework/frontend/notes",
      });
    }
  });

  return (
    <div className="flex justify-center items-center w-screen min-h-[80vh]">
      <div className="max-w-[90vw] md:max-w-[400px] w-full">
        <SignInDialogBody
          login={login}
          setLoading={setLoading}
          loading={loading}
          error={error}
          setError={setError}
          setIsOpen={(e) => {}}
        ></SignInDialogBody>
      </div>
    </div>
  );
}
