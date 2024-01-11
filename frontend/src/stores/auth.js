import { createStore } from "zustand";

/**
 * Shared auth zustand store for sharing state and already loaded data between components and routes
 * We cannot use react context as we need to use it outside of the components for preoloading
 * @author Filip Brebera w21020340
 */

const authStore = createStore((set) => ({
  loggedIn: false,
  setIsLoggedIn: (loggedIn) => set({ loggedIn }),
  user: {
    id: undefined,
    email: undefined,
  },
  setUser: (user) => set({ user }),
  token: "",
  setToken: (token) => set({ token }),
}));

export const getLoggedIn = () => authStore.getState().loggedIn;
export const setLoggedIn = (loggedIn) =>
  authStore.getState().setIsLoggedIn(loggedIn);

export const getUser = () => authStore.getState().user;
export const setUser = (user) => authStore.getState().setUser(user);

export const subscribeUser = (setUser) =>
  authStore.subscribe(({ user }) => setUser(user));

export const getToken = () => authStore.getState().token;
export const setToken = (token) => authStore.getState().setToken(token);
