import React from "react";

const VideoDialog = ({ controlDialog, videoSource }) => {
  return (
    <div
      className="video-dialog"
      onClick={(event: any) => {
        if (event.target.classList.contains("video-dialog")) {
          controlDialog(false);
        }
      }}
    >
      <div className="video-dialog-content">
        <span
          className="video-dialog-content-close"
          onClick={() => controlDialog(false)}
        >
          X
        </span>
        <video
          className="video-dialog-player"
          height="100%"
          width="100%"
          controls
          preload="none"
          autoPlay
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default VideoDialog;
