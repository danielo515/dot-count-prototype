import { useState } from "react";

export function useImage({ height, width }) {
  const [imageInfo, setImageInfo] = useState({
    loaded: false,
    isLoading: false,
  });
  const [image, setImage] = useState();
  function loadImage(src) {
    const img = new Image();
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
        loaded: true,
        isLoading: false,
      });
      setImage(img);
    };
    img.src = src;
  }
  function onFileSelected(event) {
    setImageInfo({ isLoading: true, loaded: false });
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      loadImage(event.target.result);
    };

    reader.readAsDataURL(selectedFile);
  }

  function resetImage() {
    setImageInfo({ loaded: false });
    setImage(null);
  }

  return { onFileSelected, imageInfo, image, resetImage };
}
