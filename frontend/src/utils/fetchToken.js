/**
 * Fetches token from cookies and verifies it with the API - used in preloading for authentication guard
 * @author Filip Brebera w21020340
 */

import Cookies from "js-cookie";

import { useApi } from "@hooks/useApi";
import { getUser, setLoggedIn, setToken, setUser } from "@stores/auth";

export const fetchToken = async () => {
  if (getUser()?.email) return;
  // get token from cookies
  const token = Cookies.get("logintoken");

  let res = undefined;

  console.log("no token found");
  if (token) {
    // send request to get user from token and verify it
    res = useApi()
      .getUserFromToken(token)
      .then((user) => {
        setLoggedIn(true);
        setUser(user.user);
        setToken(token);
        if (user.error) {
          Cookies.remove("logintoken");
          setToken(undefined);
          return { user: undefined, loggedIn: false };
        }
        console.log("user found");
        return { user: user.user, loggedIn: true };
      })
      // if token is invalid, remove it from cookies - ie. if it expires
      .catch((err) => {
        console.log(err);
        Cookies.remove("logintoken");
        setToken(undefined);
        return { user: undefined, loggedIn: false };
      });
    return res;
  }
  // if no token is present, return undefined
  return res ?? { user: undefined, loggedIn: false };
};
