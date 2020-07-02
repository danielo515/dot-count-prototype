import React, { useRef, useState } from "react";
import "./styles.scss";
import Konva from "konva";
import { Stage, Layer, Circle, Image } from "react-konva";
import ResetZoom from "@material-ui/icons/YoutubeSearchedFor";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import UndoIcon from "@material-ui/icons/Undo";
import { useImage } from "./useImage";
import LoadImage from "./LoadImage";
import BrushSelector from "./BrushSelector";

const pointId = p => `${p.x},${p.y}`;
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

export default function App() {
  const layerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState("#a7e326");
  const [scale, setScale] = useState(1);
  const scaleUp = () => setScale(scale => scale + 0.1);
  const scaleDown = () => setScale(scale => scale - 0.1);
  const resetZoom = () => setScale(1);
  const undo = () => setPoints(points.slice(0, -1));
  const [canvasWidth, canvasHeight] = [
    window.innerWidth,
    window.innerHeight - 16
  ];
  const { imageInfo, onFileSelected, image } = useImage({
    width: canvasWidth,
    height: canvasHeight
  });

  console.log({ imageInfo, canvasWidth, canvasHeight });

  const addPoint = e => {
    const pos = getRelativePointerPosition(e.currentTarget);
    setPoints(state => [...state, { x: pos.x, y: pos.y }]);
  };
  if (imageInfo.loaded === false) {
    return <LoadImage onFileSelected={onFileSelected} />;
  }
  return (
    <div className="App">
      <div className="controls">
        <div className="row">
          <BrushSelector
            size={size}
            onChange={setColor}
            setSize={setSize}
            color={color}
          />
          <button type="button" onClick={scaleDown}>
            <ZoomOutIcon />
          </button>
          <button type="button" onClick={resetZoom}>
            <ResetZoom />
          </button>
          <button type="button" onClick={scaleUp}>
            <ZoomInIcon />
          </button>
        </div>
        <button type="button" disabled={points.length === 0} onClick={undo}>
          <UndoIcon />
        </button>
        <button type="button" onClick={() => setPoints([])}>
          clear
        </button>
      </div>
      <div className="info">
        <h2>Items: {points.length}</h2>
        <ul>
          {points.map(p => (
            <li key={pointId(p)}>
              x: {p.x},y: {p.y}
            </li>
          ))}
        </ul>
      </div>
      <Stage draggable width={canvasWidth} height={canvasHeight}>
        <Layer ref={layerRef} scaleX={scale} scaleY={scale}>
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
              fill={color}
              radius={size}
              onClick={() => setPoints(points => removePos(idx, points))}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
