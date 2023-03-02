export function saveFile(filename, data) {
  const blob = new Blob([data], { type: "application/json" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

export const AARTI_SANGRAH = "AARTI_SANGRAH";
export const ASHTAK_PUSTIKA_1 = "ASHTAK_PUSTIKA_1";
export const ASHTAK_PUSTIKA_2 = "ASHTAK_PUSTIKA_2";
export const KAKAD_AARTI = "KAKAD_AARTI";
export const OTHER_PDF = "OTHER_PDF";

export const getAll = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setAll = (key, object) => localStorage.setItem(key, JSON.stringify(object));
