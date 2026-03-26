import React, { useState, useRef } from "react";
import { FiPlay, FiRefreshCw, FiMaximize2 } from "react-icons/fi";
import "./VideoBlock.css";

const VideoBlock = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setShowOverlay(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="video-block">
      <div className="video-container">
        <h2 className="video-title">
          Making the Most of Your Health at Alfalah
        </h2>
        <p className="video-subtitle">
          Experience quality healthcare with compassion and expertise
        </p>

        <div className="video-wrapper">
          {/* Video Player */}
          <div className="video-player">
            <iframe
              ref={videoRef}
              src={
                isPlaying
                  ? "https://www.youtube.com/embed/FBo6eORTznQ"
                  : "https://www.youtube.com/embed/ISJlniH7BEU?autoplay=0&rel=0&modestbranding=1"
              }
              title="Alfalah General Hospital - Quality Healthcare"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Overlay */}
          {showOverlay && (
            <div className="video-overlay">
              <div className="overlay-content">
                <div className="play-button-wrapper">
                  <button
                    className="play-button"
                    onClick={handlePlay}
                    aria-label="Play video"
                  >
                    <FiPlay className="play-icon" />
                  </button>
                </div>
                <h3 className="overlay-title">
                  25+ Years of Healthcare Excellence
                </h3>
                <p className="overlay-description">
                  Discover how Alfalah General Hospital has been serving the
                  Islamabad community with compassion and expertise since 1998
                </p>
                <div className="overlay-actions">
                  <a href="/doctors" className="btn btn-primary btn-cta">
                    Book Appointment
                  </a>
                  <button className="btn btn-replay" onClick={handleReplay}>
                    <FiRefreshCw className="btn-icon" />
                    Replay Video
                  </button>
                </div>
              </div>
            </div>
          )}
          {isPlaying && !showOverlay && (
            <button
              className="replay-overlay-btn"
              onClick={handleReplay}
              aria-label="Replay video"
            >
              <FiRefreshCw />
              <span>Replay</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;
