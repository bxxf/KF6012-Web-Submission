import Cookies from "js-cookie";

import { redirect } from "@tanstack/react-router";
import { setLoggedIn, setToken, setUser } from "@stores/auth";
import { useApi } from "@hooks/useApi";

import { toast } from "sonner";
/**
 * This hook is used to login and logout the user. It contains all the endpoints and methods for fetching data.
 * @author Filip brebera
 * @returns {object} login
 * @returns {function} login.login
 * @returns {function} login.logOut
 * @example const { login } = useLogin();
 */
export const useLogin = () => {
  /**
   * This function is used to login the user. It calls the getToken endpoint and saves the token to the cookies.
   * @param {string} email
   * @param {string} password
   * @returns {boolean} success
   */
  const login = async (email, password) => {
    const { getToken } = useApi();
    const res = getToken({ email, password })
      // destructuring the response object to get the token
      .then((res) => {
        // we do not need to do anything with token here as it is automatically saved in the cookies in the fetch call
        // we can expect the user is logged in now so we can change the state to logged in
        if (res.token) {
          setToken(res.token);
          Cookies.set("logintoken", res.token, {
            expires: new Date(Date.now() + 60 * 30 * 1000), // 30 minutes
          });

          setLoggedIn(true);
          setUser({ email: email });
          toast.success("Logged out successfully", {
            description:
              "You have been logged in. Now you can use note-taking features.",
            descriptionClassName: "!text-sm !text-green-600",
            duration: 10000,
          });
          return true;
        }
      })
      .catch(({ error }) => {
        console.log(error);
        return false;
      });
    return res;
  };
  /**
   * This function is used to logout the user. It removes the token from the cookies and changes the state to logged out.
   */
  const logOut = () => {
    setLoggedIn(false);
    setUser({});
    setToken(undefined);
    Cookies.remove("logintoken");
    if (window.location.pathname.includes("/notes")) {
      redirect({
        to: "/kf6012/coursework/frontend/login",
      });
    }
    toast.success("Logged out successfully", {
      description: "You have been logged out.",
      descriptionClassName: "!text-sm !text-red-500",
    });
  };

  return {
    login,
    logOut,
  };
};
