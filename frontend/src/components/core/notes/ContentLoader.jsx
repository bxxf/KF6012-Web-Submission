/**
 * This is a component that renders a loading animation
 * @author Filip Brebera w21020340
 */

import React from "react";
import ContentLoader from "react-content-loader";

const LoaderShimmer = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={160}
    viewBox="0 0 300 160"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="130" rx="0" ry="0" width="219" height="14" />
    <rect x="0" y="100" rx="0" ry="0" width="241" height="14" />
  </ContentLoader>
);

export default LoaderShimmer;
