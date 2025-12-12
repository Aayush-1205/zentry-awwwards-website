"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideo = 4;
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

  useEffect(() => {
    if (loadedVideos === totalVideo - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Hero Section - Image Animation
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
          width: "100%",
          height: "100%",
          onStart: () => {
            nextVideoRef.current?.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSource = (index: number) => `/videos/hero-${index}.mp4`;

  return (
    <section className="w-screen h-dvh relative overflow-x-hidden">
      {/* Loader */}
      {/* {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )} */}
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

        {/* Text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Text after scrolling the video */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </section>
  );
};

export default HeroSection;
