import state from "../state";
import {
  viewerElement,
  imageElement,
  inputImageElement,
  galleryElement,
  imageGalleryButton,
} from "../element";
import { getCurrentImageObject, getImageInfo, getTitle } from "../utils";
import { LIMIT_GALLERY_IMAGE } from "../constant";
const addActiveImage = (activeImageIndex) => {
  state.galleryItems[activeImageIndex].classList.add("active");
};

const removeActiveImage = (activeImageIndex) => {
  state.galleryItems[activeImageIndex].classList.remove("active");
};

const updateImageTransformAttribute = () => {
  viewerElement.style.transform = `translate(${state.translateX}px, ${state.translateY}px)`;
  imageElement.style.transform = `rotate(${state.rotateDeg}deg) 
  scaleX(${state.isFlipHorizal ? -1 : 1}) 
  scaleY(${state.isFlipVertical ? -1 : 1})
  scale(${state.imageScale})
  `;
};

const updateImageFromClickEvent = () => {
  if (state.images.length < 1) {
    imageElement.src = "data:,";
    imageElement.title = imageElement.alt = "";
    document.title = DEFAULT_TITLE;
  } else {
    const file = getCurrentImageObject().file;
    imageElement.src = URL.createObjectURL(file);
    imageElement.title = imageElement.alt = file.name;
    document.title = getTitle(
      file,
      imageElement.naturalWidth,
      imageElement.naturalHeight
    );
  }
  viewerElement.appendChild(imageElement);
};

const updateTitle = () => {
  const file = getCurrentImageObject().file;
  document.title = getTitle(
    file,
    imageElement.naturalWidth,
    imageElement.naturalHeight
  );
};

const updateImageDisplay = () => {
  if (inputImageElement.files.length === 1) {
    const file = inputImageElement.files[0];
    imageElement.src = URL.createObjectURL(file);
    imageElement.title = imageElement.alt = file.name;
    updateTitle();
  }
};

const renderGalleryImage = () => {
  let html = "";
  state.images.forEach((fileObj, index) => {
    if (index < LIMIT_GALLERY_IMAGE) {
      html += `<div class="gallery-item tooltip" data-id=${index} draggable="false">
                  <img src="${URL.createObjectURL(fileObj.file)}" \
                  alt="${fileObj.file.name}" \
                  class="gallery-image" draggable="false" />
                  <span class="gallery-text">${fileObj.file.name}</span>
                  <span class="tooltipimage bounce">
                    ${getImageInfo(fileObj)} 
                  </span>
               </div>`;
    }
  });
  galleryElement.innerHTML = html;
};

const toggleImageGallery = () => {
  state.isVisibleImageGallery = !state.isVisibleImageGallery;
  imageGalleryButton.classList.toggle("active");
  galleryElement.style.display = state.isVisibleImageGallery ? "" : "none";
};

export {
  addActiveImage,
  removeActiveImage,
  updateImageTransformAttribute,
  updateImageFromClickEvent,
  updateImageDisplay,
  renderGalleryImage,
  updateTitle,
  toggleImageGallery,
};
