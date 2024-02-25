import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from "../constant";
import { viewerElement } from "../element";
import state from "../state";
import { updateImageTransformAttribute, updateTitle } from "./domManipulation";

const handleMouseup = () => (state.isPanning = false);
const handleMousedown = (e) => {
  e.preventDefault();
  const width = viewerElement.offsetWidth;
  const height = viewerElement.offsetHeight;
  state.start = {
    x: e.clientX - width / 2 - state.translateX,
    y: e.clientY - height / 2 - state.translateY,
  };
  state.isPanning = true;
};

const handleMousemove = (e) => {
  e.preventDefault();
  if (!state.isPanning) {
    return;
  }
  const width = viewerElement.offsetWidth;
  const height = viewerElement.offsetHeight;
  state.translateX = e.clientX - width / 2 - state.start.x;
  state.translateY = e.clientY - height / 2 - state.start.y;
  updateImageTransformAttribute();
};

const zoomImageAtMousePosition = (e) => {
  e.preventDefault();
  const width = viewerElement.offsetWidth;
  const height = viewerElement.offsetHeight;
  const xs = (e.clientX - width / 2 - state.translateX) / state.imageScale,
    ys = (e.clientY - height / 2 - state.translateY) / state.imageScale,
    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
  delta > 0
    ? (state.imageScale *= SCALE_STEP)
    : (state.imageScale /= SCALE_STEP);
  state.imageScale = Math.min(Math.max(MIN_SCALE, state.imageScale), MAX_SCALE);
  state.translateX = e.clientX - width / 2 - xs * state.imageScale;
  state.translateY = e.clientY - height / 2 - ys * state.imageScale;
  updateImageTransformAttribute();
  updateTitle();
};

export {
  handleMousedown,
  handleMouseup,
  handleMousemove,
  zoomImageAtMousePosition,
};
