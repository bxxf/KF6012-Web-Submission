/**
 * This component renders the hero section of the index page. It shows a random video from the database and allows the user to generate another random video.
 * @author Filip Brebera w21020340
 * @param {*} param0
 * @param {Array} param0.videos Array of videos from the database
 */

import { useState } from "react";
import { generateRandomInt, getRandomInt } from "@stores/data";
import RefreshSymbol from "@components/shared/icons/RefreshSymbol";

export default function Hero({ videos }) {
  // prevent changing the random video on every render by using stores to store the random int
  const [randInt, setRandInt] = useState(getRandomInt(videos.length));
  if (!randInt) setRandInt(generateRandomInt(videos));

  const randomVideo = videos[randInt];
  return (
    <div className="flex items-center py-10 px-5 md:py-20 md:mx-10 rounded-3xl flex-col bg-gray-100">
      <h1 className="text-5xl md:text-[3.55rem] bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 font-extrabold text-center">
        CHI 2023
      </h1>
      <h2 className="text-xl md:text-[2.15rem] text-[#333333] font-bold mt-6 text-center">
        Conference on Human Factors in Computing Systems
      </h2>
      <p className="text-gray-500 text-xl mt-4 text-center">
        April 23. - 28., Hamburg, Germany
      </p>
      <div className="h-10 border-l-2 border-gray-500 mt-12"></div>
      <h3 className="text-sm md:text-[1.25rem] text-gray-500 font-medium mt-6 text-center mt-12 mb-6">
        Watch this <span className="text-blue-800">random</span> video to learn
        more about topics at <span className="text-blue-800">CHI 2023</span>:
      </h3>
      <div className="w-1/2 min-w-[300px] bg-gray-300 rounded-xl aspect-video">
        <iframe
          src={randomVideo?.preview_video.replace("watch?v=", "embed/")}
          className="w-full h-full overflow-hidden rounded-xl"
        ></iframe>
      </div>
      <div className="py-2 px-4 text-gray-400 mt-1 text-center">
        {randomVideo?.title}
      </div>
      <div className="py-2 px-4 text-gray-400 -mt-4 italic text-sm text-center">
        URL: {randomVideo?.preview_video}
      </div>
      <button
        className="py-2 px-3 border-[1px] rounded-lg mt-4 text-gray-700 flex items-center"
        onClick={() => {
          setRandInt(generateRandomInt(videos.length));
        }}
      >
        <RefreshSymbol></RefreshSymbol>
        <span className="ml-2">Show another video</span>
      </button>
    </div>
  );
}
