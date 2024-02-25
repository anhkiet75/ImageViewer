import { GALLERY_HEIGHT, HEADER_HEIGHT } from "../constant";
import { imageElement, viewerElement } from "../element";
import state from "../state";
import { updateImageTransformAttribute, updateTitle } from "./domManipulation";

const resetImageAttribute = () => {
  state.rotateDeg = 0;
  state.isFlipHorizal = false;
  state.isFlipVertical = false;
  state.imageScale = 1;
  state.translateX = 0;
  state.translateY = 0;
};

const handleRotate = (deg) => {
  state.rotateDeg = (state.rotateDeg + deg) % 360;
  updateImageTransformAttribute();
};

const handleFlipHorizal = () => {
  state.isFlipHorizal = !state.isFlipHorizal;
  updateImageTransformAttribute();
};

const handleFlipVertical = () => {
  state.isFlipVertical = !state.isFlipVertical;
  updateImageTransformAttribute();
};

const handleAutoZoom = () => {
  state.imageScale = 1;
  updateImageTransformAttribute();
  // setActiveButtonGroup();
  updateTitle();
};

const handleScaleToHeight = () => {
  resetImageAttribute();
  updateImageTransformAttribute();
  imageElement.style.width = "auto";
  imageElement.style.height = `${
    window.innerHeight -
    HEADER_HEIGHT -
    (state.isVisibleImageGallery ? GALLERY_HEIGHT : 0)
  }px`;
};

const handleScaleToWidth = () => {
  resetImageAttribute();
  updateImageTransformAttribute();
  imageElement.style.height = "auto";
  imageElement.style.width = `${window.innerWidth}px`;
};

export {
  handleAutoZoom,
  handleFlipHorizal,
  handleFlipVertical,
  handleRotate,
  handleScaleToHeight,
  handleScaleToWidth,
  resetImageAttribute,
};
