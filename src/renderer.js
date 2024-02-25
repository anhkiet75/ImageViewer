import { handleNext, handlePrevious } from "./features/navigation";
import { handleAddImages, handleDelete, openMenu } from "./features/file";
import { toggleFullscreen, zoomImage } from "./features/zoom";
import { toggleImageGallery } from "./features/domManipulation";
import {
  handleMousedown,
  handleMousemove,
  handleMouseup,
  zoomImageAtMousePosition,
} from "./features/mouseEvent";
import {
  handleAutoZoom,
  handleFlipHorizal,
  handleFlipVertical,
  handleRotate,
  handleScaleToHeight,
  handleScaleToWidth,
} from "./features/transformImage";
import {
  inputImageElement,
  deleteElement,
  viewerElement,
  rotateLeftButton,
  rotateRightButton,
  flipHorizalButton,
  flipVerticalButton,
  imageGalleryButton,
  previousButton,
  nextButton,
  zoomInButton,
  zoomOutButton,
  autoZoomButton,
  menuElement,
  fullscreenButton,
  scaleWidthButton,
  scaleHeightButton,
  imageContainer,
} from "./element";

inputImageElement.addEventListener("change", handleAddImages);
rotateLeftButton.addEventListener("click", () => handleRotate(-90));
rotateRightButton.addEventListener("click", () => handleRotate(90));
flipHorizalButton.addEventListener("click", handleFlipHorizal);
flipVerticalButton.addEventListener("click", handleFlipVertical);
imageGalleryButton.addEventListener("click", toggleImageGallery);
previousButton.addEventListener("click", handlePrevious);
nextButton.addEventListener("click", handleNext);
zoomInButton.addEventListener("click", () => zoomImage(1));
zoomOutButton.addEventListener("click", () => zoomImage(-1));
autoZoomButton.addEventListener("click", handleAutoZoom);
fullscreenButton.addEventListener("click", toggleFullscreen);
scaleHeightButton.addEventListener("click", handleScaleToHeight);
scaleWidthButton.addEventListener("click", handleScaleToWidth);
deleteElement.addEventListener("click", handleDelete);
menuElement.addEventListener("click", openMenu);
viewerElement.addEventListener("wheel", zoomImageAtMousePosition);
imageContainer.addEventListener("mousedown", handleMousedown);
imageContainer.addEventListener("mouseup", handleMouseup);
imageContainer.addEventListener("mousemove", handleMousemove);
