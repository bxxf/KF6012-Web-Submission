import { createStore } from "zustand";

/**
 * Shared data zustand store for sharing state and already loaded data between components and routes
 * We cannot use react context as we need to use it outside of the components for preoloading
 * @author Filip Brebera w21020340
 */
const dataStore = createStore((set) => ({
  randomInt: undefined,
  videos: [],
  countries: [],
  content: [],
  contentTypes: [],
  notes: [],
  fullDirectory: [],
  setVideos: (videos) => set({ videos }),
  setRandomInt: (randomInt) => set({ randomInt }),
  setCountries: (countries) => set({ countries }),
  setContent: (content) => set({ content }),
  setContentTypes: (contentTypes) => set({ contentTypes }),
  setNotes: (notes) => set({ notes }),
  setFullDirectory: (fullDirectory) => set({ fullDirectory }),
}));

// define getters and setters for the store to be used in other components
export const getVideos = () => dataStore.getState().videos;
export const setVideos = (videos) => dataStore.getState().setVideos(videos);

export const getRandomInt = () => dataStore.getState().randomInt;

export const generateRandomInt = (array) => {
  const randomInt = Math.floor(Math.random() * array.length);
  dataStore.getState().setRandomInt(randomInt);
  return randomInt;
};

export const getCountries = () => dataStore.getState().countries;
export const setCountries = (countries) =>
  dataStore.getState().setCountries(countries);

export const getContent = () => dataStore.getState().content;
export const setContent = (content) => dataStore.getState().setContent(content);

export const getContentTypes = () => dataStore.getState().contentTypes;
export const setContentTypes = (contentTypes) =>
  dataStore.getState().setContentTypes(contentTypes);

export const getNotes = () => dataStore.getState().notes;
export const setNotes = (notes) => dataStore.getState().setNotes(notes);

export const getFullDirectory = () => dataStore.getState().fullDirectory;
export const setFullDirectory = (fullDirectory) =>
  dataStore.getState().setFullDirectory(fullDirectory);

export const subscribeFullDirectory = (setFullDirectory) =>
  dataStore.subscribe(({ fullDirectory }) => setFullDirectory(fullDirectory));

export const getContentById = (id) => {
  const content = dataStore.getState().fullDirectory;
  return content.find((item) => item.content_id === id);
};
