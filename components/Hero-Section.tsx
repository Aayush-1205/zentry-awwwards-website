"use client";

import { useRef, useState } from "react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideo = 3;
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  // 0 % 4 = 0 + 1 = 1
  // 1 % 4 = 1 + 1 = 2
  // 2 % 4 = 2 + 1 = 3
  // 3 % 4 = 3 + 1 = 4
  // 4 % 4 = 0 + 1 = 1
  const upcomingVideoIndex = (currentIndex % totalVideo) + 1;

  const handleVideoLoad = () => {
    setLoadedVideos((p) => p + 1);
    // if (loadedVideos + 1 === totalVideo) {
    //   setIsLoading(false);
    // }
  };

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSource = (index: number) => `/videos/hero-${index}.mp4`;

  return (
    <section className="w-screen h-dvh relative overflow-x-hidden">
      {/* Video Frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Videos */}
        <div>
          {/* Mini Video Player */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                src={getVideoSource(upcomingVideoIndex)}
                ref={nextVideoRef}
                loop
                muted
                onLoadedData={handleVideoLoad}
              ></video>
            </div>
          </div>

          {/* Video Player */}
          <video
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            src={getVideoSource(currentIndex)}
            ref={nextVideoRef}
            loop
            muted
          ></video>

          <video
            src={getVideoSource(currentIndex === totalVideo ? 1 : currentIndex)}
            autoPlay
            muted
            loop
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          ></video>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
