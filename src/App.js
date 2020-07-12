import React, { useRef, useState } from "react";
import "./styles.scss";
import "normalize.css";
import { Stage, Layer, Circle, Image } from "react-konva";
import { useImage } from "./useImage";
import LoadImage from "./LoadImage";
import TopBar from "./TopBar";
import { ControlBar } from "./components";
import useBrush from "./hooks/useBrush";

const pointId = (p) => `${p.x},${p.y}`;
// Creates a new array with the item at idx removed
const removePos = (idx, arr) => [...arr.slice(0, idx), ...arr.slice(idx + 1)];
// this function will return pointer position relative to the passed node
function getRelativePointerPosition(node) {
  var transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  var pos = node.getStage().getPointerPosition();

  // now we can find relative point
  return transform.point(pos);
}
// Too bad this is not calculated, but at leas on css it is
const ButtonSize = 56;

export default function App() {
  const { brush } = useBrush();
  const layerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [scale, setScale] = useState(1);
  const scaleUp = () => setScale((scale) => scale + 0.1);
  const scaleDown = () => setScale((scale) => scale - 0.1);
  const resetZoom = () => {
    layerRef.current.position({ x: 0, y: 0 });
    setScale(1);
  };
  const undo = () => setPoints(points.slice(0, -1));
  const [canvasWidth, canvasHeight] = [
    window.innerWidth,
    window.innerHeight - 16 - ButtonSize,
  ];
  const { imageInfo, onFileSelected, image, resetImage } = useImage({
    width: canvasWidth,
    height: canvasHeight,
  });

  const reset = () => {
    resetImage();
    setPoints([]);
  };

  const clearPoints = () => setPoints([]);

  const addPoint = (e) => {
    const pos = getRelativePointerPosition(e.currentTarget);
    setPoints((state) => [...state, { x: pos.x, y: pos.y }]);
  };
  if (imageInfo.loaded === false) {
    return <LoadImage onFileSelected={onFileSelected} />;
  }
  return (
    <div className="App">
      <ControlBar
        scaleUp={scaleUp}
        scaleDown={scaleDown}
        resetZoom={resetZoom}
        clear={clearPoints}
        points={points}
        undo={undo}
      />
      <TopBar count={points.length} reset={reset} />
      <Stage ref={layerRef} draggable width={canvasWidth} height={canvasHeight}>
        <Layer scaleX={scale} scaleY={scale}>
          {imageInfo.loaded && (
            <Image
              image={image}
              onClick={addPoint}
              onTap={addPoint}
              width={imageInfo.targetWidth}
              height={imageInfo.targetHeight}
            />
          )}
          {points.map((p, idx) => (
            <Circle
              key={pointId(p)}
              x={p.x}
              y={p.y}
              {...(brush.style === "circle"
                ? {
                    stroke: brush.color,
                    radius: brush.size * 2,
                  }
                : { fill: brush.color, radius: brush.size })}
              onClick={() => setPoints((points) => removePos(idx, points))}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
