import React from "react";
import camera from "../public/camera.png";
import styles from "./LoadImage.scss";

export default function LoadImage({ onFileSelected }) {
  return (
    <div className="wrapper">
      <label>
        <img src={camera} alt="camera icon" />
        <input
          name="image"
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
          onChange={onFileSelected}
        />
        <div>Load picture</div>
      </label>
    </div>
  );
}
