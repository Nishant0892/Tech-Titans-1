import React, { useState } from "react";
import Webcam from "react-webcam";
import "./../styles/Surveillance.css";

function Surveillance() {
  const webcamRef = React.useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = () => {
    setCameraOn(true);
  };

  const stopCamera = () => {
    setCameraOn(false);
  };

  return (
    <div className="surveillance-page">
      <h2>Surveillance System 📸</h2>

      {cameraOn ? (
        <Webcam audio={false} ref={webcamRef} className="webcam-feed" />
      ) : (
        <div className="camera-off">Camera is Off ❌</div>
      )}

      <div className="surveillance-buttons">
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
      </div>
    </div>
  );
}

export default Surveillance;
