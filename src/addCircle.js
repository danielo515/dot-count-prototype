// This was injected to the Stage onClick handler
const addCircle = e => {
  const pos = e.currentTarget.pointerPos;
  const shape = new Konva.Circle({
    x: pos.x,
    y: pos.y,
    fill: "green",
    strokeWidth: 0,
    radius: 2
  });
  setPoints(state => [...state, { x: pos.x, y: pos.y }]);
  layerRef.current.add(shape);
  layerRef.current.batchDraw();
};
