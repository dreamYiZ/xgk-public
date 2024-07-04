import React, { useEffect } from 'react';
import Bideo from "../util/bbv";

export default function () {
  useEffect(() => {
    var bv = new Bideo();
    bv.init({
      videoEl: document.querySelector("#background_video"),
      container: document.querySelector("body"),
      resize: true,
      isMobile: window.matchMedia("(max-width: 768px)").matches,
      src: [
        {
          src: VideoFullv,
          type: "video/mp4",
        },
      ],
      onLoad: function () {
        if (document.querySelector("#video_cover")) {
          document.querySelector("#video_cover").style.display = "none";
        }
      },
    });
  }, []);

  return (
    <div id="container">
      <video id="background_video" loop muted></video>
    </div>
  );
}
