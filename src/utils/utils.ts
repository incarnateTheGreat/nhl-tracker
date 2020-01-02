export const createFileName = fileName => {
  return fileName
    .toLowerCase()
    .replace(".", "")
    .replace(/[é]/g, "e")
    .replace(/[É]/g, "E")
    .replace(/\s/g, "-");
};
