import { useRef, useEffect } from "react";
import "../assets/css/camera.css";

function Camera({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  }, []);

  const capture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(blob => onCapture(blob));
  };

  return (
    <>
      <video ref={videoRef} autoPlay className="videocapture"/>
      <button onClick={capture} className="capture">Capture</button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}

export default Camera;