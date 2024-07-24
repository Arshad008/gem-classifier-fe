export const getConvertedJpgFile = (file) => {
  if (file.type === "image/jpeg") return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], 'converted.jpg', { type: 'image/jpeg' }));
            } else {
              reject(new Error('Conversion to JPG failed.'));
            }
          },
          'image/jpeg',
          1
        );
      };
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};