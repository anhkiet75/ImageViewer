const LIMIT_GALLERY_IMAGE = 6;
const MAX_SCALE = 100;
const MIN_SCALE = 0.005;
const SCALE_STEP = 1.1;
const DEFAULT_WINDOW_WIDTH = 800;
const DEFAULT_WINDOW_HEIGHT = 600;
const DEFAULT_TITLE = "Image viewer";
const HEADER_HEIGHT = 36;
const GALLERY_HEIGHT = 82;
const FILETYPES = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

// module.exports.FILETYPES = FILETYPES;

export {
  LIMIT_GALLERY_IMAGE,
  MAX_SCALE,
  MIN_SCALE,
  SCALE_STEP,
  DEFAULT_WINDOW_WIDTH,
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_TITLE,
  HEADER_HEIGHT,
  FILETYPES,
  GALLERY_HEIGHT,
};
