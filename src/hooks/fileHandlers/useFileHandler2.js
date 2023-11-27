/* eslint-disable no-alert */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useFileHandler2 = (initState) => {
  const [imageFile2, setImageFile2] = useState(initState);
  const [isFileLoading2, setFileLoading2] = useState(false);
  const removeImage2 = ({ id2, name2 }) => {
    const items1 = imageFile2[name2].filter((item2) => item2.id2 !== id2);

    setImageFile2({
      ...imageFile2,
      [name2]: items1
    });
  };
  
  const onFileChange2 = (event, { name2, type }) => {
    const val = event.target.value;
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setFileLoading2(true);
    if (!regex.exec(val)) {
      alert('File type must be JPEG or PNG', 'error');
      setFileLoading2(false);
    } else if (size > 0.5) {
      alert('File size exceeded 500kb, consider optimizing your image', 'error');
      setFileLoading2(false);
    } else if (type === 'multiple') {
      Array.from(event.target.files).forEach((file2) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          setImageFile2((oldFiles) => ({
            ...oldFiles,
            [name2]: [...oldFiles[name2], { file2, url: e.target.result, id2: uuidv4() }]
          }));
        });
        reader.readAsDataURL(file2);
      });

      setFileLoading2(false);
    } else { // type is single
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        setImageFile2({
          ...imageFile2,
          [name2]: { file2: img, url: e.target.result }
        });
        setFileLoading2(false);
      });
      reader.readAsDataURL(img);
    }
  };
  
  return {
    imageFile2,
    setImageFile2,
    isFileLoading2,
    onFileChange2,
    removeImage2,
  };
};

export default useFileHandler2;
