import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from "../constant";
import { fullscreenButton } from "../element";
import state from "../state";
import { updateImageTransformAttribute } from "./domManipulation";

const zoomImage = (step) => {
  step > 0
    ? (state.imageScale *= SCALE_STEP)
    : (state.imageScale /= SCALE_STEP);
  state.imageScale = Math.min(Math.max(MIN_SCALE, state.imageScale), MAX_SCALE);
  updateImageTransformAttribute();
  updateTitle();
};

const toggleFullscreen = () => {
  state.isFullscreen = !state.isFullscreen;
  window.api.setFullscreen(state.isFullscreen).then(() => {
    fullscreenButton.classList.toggle("active");
    handleScaleToHeight();
  });
};

export { zoomImage, toggleFullscreen };
