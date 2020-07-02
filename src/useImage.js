import { useState } from "react";

export function useImage({ height, width }) {
  const [imageInfo, setImageInfo] = useState({ loaded: false });
  const [image, setImage] = useState();
  function loadImage(src) {
    var img = new Image();
    img.onload = function imageLoaded() {
      const ratio = img.width / img.height;
      const targetHeight = Math.min(height, width / ratio);
      const targetWidth = Math.min(width, height * ratio);
      setImageInfo({
        height: img.height,
        width: img.width,
        ratio,
        targetHeight,
        targetWidth,
        centerX: targetWidth / 2,
        centerY: targetHeight / 2,
        loaded: true
      });
      setImage(img);
    };
    img.src = src;
  }
  function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      loadImage(event.target.result);
    };

    reader.readAsDataURL(selectedFile);
  }

  return { onFileSelected, imageInfo, image };
}
