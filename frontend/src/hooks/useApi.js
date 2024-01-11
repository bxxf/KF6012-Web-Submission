import Cookies from "js-cookie";

import { config } from "../config/config";
import { getToken as storeToken } from "@stores/auth";

// endpoints enum
const ENDPOINTS = {
  PREVIEWS: "/preview",
  COUNTRIES: "/country",
  AFFILIATIONSCONTENT: "/directory",
  CONTENTTYPES: "/content-types",
  TOKEN: "/token",
  USER: "/user",
  NOTES: "/note",
};

/**
 * This hook is used to fetch data from the API. It contains all the endpoints and methods for fetching data.
 * @author Filip Brebera w21020340
 * @returns {object} api
 * @returns {function} api.fetchVideos
 * @returns {function} api.fetchCountries
 * @returns {function} api.fetchContent
 * @returns {function} api.fetchContentTypes
 * @returns {function} api.getToken
 * @returns {function} api.getUserFromToken
 * @returns {function} api.fetchNotes
 * @returns {function} api.createNote
 * @returns {function} api.updateNote
 * @returns {function} api.deleteNote
 * @example const { fetchVideos } = useApi();
 */
export const useApi = () => {
  const API_URL = config.apiUrl;

  /**
   * Fetches videos from the API
   * @returns {object[]} previews
   */
  const fetchVideos = async () => {
    const response = await fetch(API_URL + ENDPOINTS.PREVIEWS);
    const data = await response.json();
    return data.previews;
  };

  /**
   * Fetches countries from the API
   * @returns {string[]} countries
   */
  const fetchCountries = async () => {
    const response = await fetch(API_URL + ENDPOINTS.COUNTRIES);
    const data = await response.json();
    return data.countries;
  };

  /**
   * Fetches content from the API
   * @param {object} props
   * @param {number} props.limit
   * @param {string} props.contentType
   * @param {number} props.page
   * @param {string} props.country
   * @param {string} props.searchTerm
   * @returns {object} content
   */
  const fetchContent = async (props) => {
    const limit = props?.limit ? "?limit=" + props?.limit : "";
    const content = props?.contentType ? "&type=" + props?.contentType : "";
    const country = props?.country ? "&country=" + props?.country : "";
    const page = props?.page ? "&page=" + props?.page : "";
    const searchTerm = props?.searchTerm ? "?search=" + props?.searchTerm : "";

    const response = await fetch(
      API_URL +
        ENDPOINTS.AFFILIATIONSCONTENT +
        limit +
        content +
        page +
        country +
        searchTerm
    );
    const data = await response.json();
    return data.content;
  };

  /**
   * Fetches content types from the API
   * @returns {object} contentTypes
   */
  const fetchContentTypes = async () => {
    const response = await fetch(API_URL + ENDPOINTS.CONTENTTYPES);
    const data = await response.json();
    return data.types;
  };

  /**
   * Fetches a token from the server
   * @param {object} props
   * @param {string} props.email
   * @param {string} props.password
   * @returns {string} token
   */
  const getToken = async ({ email, password }) => {
    const response = await fetch(API_URL + ENDPOINTS.TOKEN, {
      method: "POST",
      // this ensures the cookies are automatically saved
      credentials: "include",
      headers: {
        Authorization: "Basic " + btoa(email + ":" + password),
      },
    });
    return await response.json();
  };

  /**
   * Fetches a user from the server
   * @param {string} token
   * @returns {object} user
   * @returns {string} user.email
   * @returns {number} user.id
   */
  const getUserFromToken = async (token) => {
    const response = await fetch(API_URL + ENDPOINTS.USER, {
      method: "GET",
      headers: {
        // here we need to get token directly from cookies as it is not in state yet
        Authorization: "Bearer " + Cookies.get("logintoken"),
      },
    });
    return await response.json();
  };

  /**
   * Fetches notes from the server
   * @returns {object} notes
   */
  const fetchNotes = async () => {
    const response = await fetch(API_URL + ENDPOINTS.NOTES, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storeToken(),
      },
    });
    return (await response.json()).notes;
  };

  /**
   * Creates a note on the server
   * @param {object} props
   * @param {string} props.note
   * @param {number} props.contentId
   * @returns {object} response
   */
  const createNote = async ({ note, contentId }) => {
    return await fetch(API_URL + ENDPOINTS.NOTES, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + storeToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: note,
        content_id: contentId,
      }),
    });
  };

  /**
   * Updates a note on the server
   * @param {object} props
   * @param {string} props.note
   * @param {number} props.noteId
   * @returns {object} response
   */
  const updateNote = ({ note, noteId }) => {
    return fetch(API_URL + ENDPOINTS.NOTES, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + storeToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_id: noteId,
        text: note,
      }),
    });
  };

  /**
   * Deletes a note on the server
   * @param {object} props
   * @param {number} props.noteId
   * @returns {object} response
   */
  const deleteNote = ({ noteId }) => {
    return fetch(API_URL + ENDPOINTS.NOTES, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + storeToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note_id: noteId,
      }),
    });
  };

  return {
    deleteNote,
    updateNote,
    createNote,
    fetchVideos,
    fetchNotes,
    getToken,
    fetchCountries,
    fetchContent,
    fetchContentTypes,
    getUserFromToken,
  };
};
