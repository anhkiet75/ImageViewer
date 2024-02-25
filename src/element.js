const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputImageElement = $("#image");
const viewerElement = $("#image-viewer");
const imageElement = $("#image-element");
const rotateLeftButton = $("#rotate-left");
const rotateRightButton = $("#rotate-right");
const flipHorizalButton = $("#flip-horizal");
const flipVerticalButton = $("#flip-vertical");
const openFileButton = $("#open-file");
const imageGalleryButton = $("#image-gallery");
const previousButton = $("#previous");
const nextButton = $("#next");
const zoomInButton = $("#zoom-in");
const zoomOutButton = $("#zoom-out");
const autoZoomButton = $("#auto-zoom");
const fullscreenButton = $("#fullscreen");
const scaleWidthButton = $("#scale-width");
const scaleHeightButton = $("#scale-height");
const deleteElement = $("#trash");
const menuElement = $("#menu");
const imageContainer = $(".image-container");
const galleryElement = $(".gallery-container");
const scaleButtonGroup = $$(".scale-group");
const galleryItems = $$(".gallery-item");
export {
  galleryItems,
  menuElement,
  inputImageElement,
  viewerElement,
  imageElement,
  rotateLeftButton,
  rotateRightButton,
  flipHorizalButton,
  flipVerticalButton,
  openFileButton,
  imageGalleryButton,
  previousButton,
  nextButton,
  zoomInButton,
  zoomOutButton,
  autoZoomButton,
  fullscreenButton,
  scaleWidthButton,
  scaleHeightButton,
  imageContainer,
  galleryElement,
  scaleButtonGroup,
  deleteElement,
};
