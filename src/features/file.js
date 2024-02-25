import state from "../state";
import { inputImageElement } from "../element";
import { getCurrentImageObject } from "../utils";
import {
  addActiveImage,
  removeActiveImage,
  renderGalleryImage,
  updateImageDisplay,
  updateImageFromClickEvent,
  updateImageTransformAttribute,
} from "./domManipulation";
import { resetImageAttribute } from "./transformImage";

const handleSelectItem = (item, index) => {
  resetImageAttribute();
  updateImageTransformAttribute();
  removeActiveImage(state.currentSelectImageIndex);
  state.currentSelectImageIndex = index;
  addActiveImage(state.currentSelectImageIndex);
  updateImageFromClickEvent();
};

const addEventGalleryItem = () => {
  state.galleryItems = document.querySelectorAll(".gallery-item");
  state.galleryItems.forEach((item, index) =>
    item.addEventListener("click", () => handleSelectItem(item, index))
  );
};

const handleAddImages = () => {
  const file = inputImageElement.files[0];
  window.api.readImagesFromFolder(file.path).then((files) => {
    state.images = files.map((file) => {
      const [data, fileName, ctime, sizes, filePath] = file;
      return {
        file: new File([data], fileName),
        ctime,
        sizes,
        filePath,
      };
    });
    state.currentSelectImageIndex = state.images.findIndex(
      (fileObj) => fileObj.file.name == file.name
    );
    updateImageDisplay();
    renderGalleryImage();
    addEventGalleryItem();
    addActiveImage(state.currentSelectImageIndex);
  });
};

const deleteGalleryItem = (index) => {
  const galleryAllItems = document.querySelectorAll(".gallery-item");
  galleryAllItems[index].remove();
};

const handleDelete = () => {
  const filePath = getCurrentImageObject().filePath;
  window.api.delete(filePath).then(() => {
    deleteGalleryItem(state.currentSelectImageIndex);
    state.images.splice(state.currentSelectImageIndex, 1);
    state.currentSelectImageIndex--;
    if (state.currentSelectImageIndex < 0)
      state.currentSelectImageIndex = state.images.length - 1;
    updateImageFromClickEvent();
    addActiveImage(state.currentSelectImageIndex);
  });
};

const openMenu = (event) => {
  window.api.openMenu(event.pageX, event.pageY);
};

export { handleAddImages, openMenu, handleDelete };
