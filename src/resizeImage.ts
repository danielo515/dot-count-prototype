interface imageInfo {
  height: number;
  width: number;
  ratio: number;
}

export function resizeImage({
  height,
  width,
  img
}: {
  height: number;
  width: number;
  img: imageInfo;
}) {
  const targetHeight = Math.min(height, width / img.ratio);
  const targetWidth = Math.min(width, height * img.ratio);
  return {
    height: targetHeight,
    width: targetWidth
  };
}
