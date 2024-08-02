import CryptoJS from "crypto-js";

// Convert Image To JPG
export const getConvertedJpgFile = (file) => {
  if (file.type === "image/jpeg") return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File([blob], "converted.jpg", { type: "image/jpeg" })
              );
            } else {
              reject(new Error("Conversion to JPG failed."));
            }
          },
          "image/jpeg",
          1
        );
      };
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Email Validation
export const isEmailValid = (email = "") => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Hash Password
export const getSha512ConvertedHash = (text) => {
  return CryptoJS.SHA512(text).toString();
};

// Local Storage Helpers
export const setAuthUserIdToLocalStorage = (userId) => {
  window.localStorage.setItem("AUTH_USER_ID", userId);
};

export const getAuthUserIdFromLocalStorage = () => {
  return window.localStorage.getItem("AUTH_USER_ID");
};
