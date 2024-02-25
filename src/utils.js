import state from "./state";

const formatBytes = (bytes, decimals) => {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const formatLocalTimeFromSeconds = (seconds) => {
  const date = new Date(seconds); // Convert seconds to milliseconds
  return date.toLocaleString();
};

const getCurrentImageObject = () => state.images[state.currentSelectImageIndex];

const getTitle = (file, width, height) => {
  const fileIndex = `${parseInt(state.currentSelectImageIndex) + 1}/${
    state.images.length
  }`;
  const formatedSize = formatBytes(file?.size);
  const scalePercent = Number(state.imageScale * 100).toFixed(0);
  const formatedDate = formatLocalTimeFromSeconds(file?.lastModified);
  return `${file?.name} | ${fileIndex} file(s) | \ 
  ${scalePercent}% | ${width}x${height} | \
  ${formatedSize} | ${formatedDate}`;
};

const getImageInfo = (fileObj) => {
  const formatedSize = formatBytes(fileObj.file.size);
  const formatedDate = formatLocalTimeFromSeconds(fileObj.ctime);
  const width = fileObj.sizes.width;
  const height = fileObj.sizes.height;
  return `<span style='color: #ff7070; font-size: 12px'> \
            ${fileObj.file.name} \(${width}x${height}) 
          </span> 
          <span>${fileObj.file.path}</span>
          <span>File size: ${formatedSize}</span>
          <span>Date modified: ${formatedDate}</span>
  `;
};

export {
  formatBytes,
  formatLocalTimeFromSeconds,
  getCurrentImageObject,
  getTitle,
  getImageInfo,
};
