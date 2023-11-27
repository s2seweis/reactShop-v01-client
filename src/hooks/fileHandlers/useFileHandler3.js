/* eslint-disable no-alert */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useFileHandler3 = (initState) => {
  const [imageFile3, setImageFile3] = useState(initState);
  const [isFileLoading3, setFileLoading3] = useState(false);
  const removeImage3 = ({ id3, name3 }) => {
    const items3 = imageFile3[name3].filter((item3) => item3.id3 !== id3);

    setImageFile3({
      ...imageFile3,
      [name3]: items3
    });
  };

  const onFileChange3 = (event, { name3, type }) => {
    const val = event.target.value;
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setFileLoading3(true);
    if (!regex.exec(val)) {
      alert('File type must be JPEG or PNG', 'error');
      setFileLoading3(false);
    } else if (size > 0.5) {
      alert('File size exceeded 500kb, consider optimizing your image', 'error');
      setFileLoading3(false);
    } else if (type === 'multiple') {
      Array.from(event.target.files).forEach((file3) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          setImageFile3((oldFiles) => ({
            ...oldFiles,
            [name3]: [...oldFiles[name3], { file3, url: e.target.result, id3: uuidv4() }]
          }));
        });
        reader.readAsDataURL(file3);
      });

      setFileLoading3(false);
    } else { // type is single
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        setImageFile3({
          ...imageFile3,
          [name3]: { file3: img, url: e.target.result }
        });
        setFileLoading3(false);
      });
      reader.readAsDataURL(img);
    }
  };

  return {
    imageFile3,
    setImageFile3,
    isFileLoading3,
    onFileChange3,
    removeImage3,
      };
};

export default useFileHandler3;
