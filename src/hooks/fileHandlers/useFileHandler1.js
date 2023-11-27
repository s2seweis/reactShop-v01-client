/* eslint-disable no-alert */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useFileHandler1 = (initState) => {
  const [imageFile1, setImageFile1] = useState(initState);
  const [isFileLoading1, setFileLoading1] = useState(false);

  const removeImage1 = ({ id1, name1 }) => {
    const items1 = imageFile1[name1].filter((item1) => item1.id1 !== id1);

    setImageFile1({
      ...imageFile1,
      [name1]: items1
    });
  };

  const onFileChange1 = (event, { name1, type }) => {
    const val = event.target.value;
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setFileLoading1(true);
    if (!regex.exec(val)) {
      alert('File type must be JPEG or PNG', 'error');
      setFileLoading1(false);
    } else if (size > 0.5) {
      alert('File size exceeded 500kb, consider optimizing your image', 'error');
      setFileLoading1(false);
    } else if (type === 'multiple') {
      Array.from(event.target.files).forEach((file1) => {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
          setImageFile1((oldFiles) => ({
            ...oldFiles,
            [name1]: [...oldFiles[name1], { file1, url: e.target.result, id1: uuidv4() }]
          }));
        });
        reader.readAsDataURL(file1);
      });

      setFileLoading1(false);
    } else { // type is single
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        setImageFile1({
          ...imageFile1,
          [name1]: { file1: img, url: e.target.result }
        });
        setFileLoading1(false);
      });
      reader.readAsDataURL(img);
    }
  };

  return {
    imageFile1,
    setImageFile1,
    isFileLoading1,
    onFileChange1,
    removeImage1,
  };
};

export default useFileHandler1;
