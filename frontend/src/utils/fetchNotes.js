/**
 * Fetches content types and content from the API - used for preloading
 * @author Filip Brebera w21020340
 */

import { getContentTypes, setContentTypes } from "@stores/data";
import { useApi } from "@hooks/useApi";

export const fetchNotes = async () => {
  // fetch content an content types if not already fetched
  const { fetchContentTypes } = useApi();
  if (getContentTypes().length < 1) setContentTypes(await fetchContentTypes());
};
