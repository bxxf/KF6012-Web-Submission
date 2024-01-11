/**
 * This route renders the home page of the application.
 * @author Filip Brebera w21020340
 */

import { Route } from "@tanstack/react-router";

import { useApi } from "@hooks/useApi";
import { rootRoute } from "@routes/__root";
import { getVideos, setVideos } from "@stores/data";

import Hero from "@components/core/index/Hero";
import List from "@components/core/index/List";

const fetchVideos = async () => {
  const { fetchVideos } = useApi();
  // prevent refetching the data
  if ((await getVideos().length) > 0) return;
  setVideos(await fetchVideos());
};

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/kf6012/coursework/frontend/home",
  component: Home,
  beforeLoad: () => fetchVideos(),
});

function Home() {
  const videos = getVideos();
  return (
    <div>
      <Hero videos={videos}></Hero>
      <List></List>
    </div>
  );
}
