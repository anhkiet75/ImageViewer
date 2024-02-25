import {
  addActiveImage,
  removeActiveImage,
  updateImageFromClickEvent,
} from "./domManipulation";

import state from "../state";

const handlePrevious = () => {
  removeActiveImage(state.currentSelectImageIndex);
  state.currentSelectImageIndex--;
  if (state.currentSelectImageIndex < 0)
    state.currentSelectImageIndex += state.images.length;
  updateImageFromClickEvent();
  addActiveImage(state.currentSelectImageIndex);
};

const handleNext = () => {
  removeActiveImage(state.currentSelectImageIndex);
  state.currentSelectImageIndex =
    (state.currentSelectImageIndex + 1) % state.images.length;
  updateImageFromClickEvent();
  addActiveImage(state.currentSelectImageIndex);
};

export { handleNext, handlePrevious };
