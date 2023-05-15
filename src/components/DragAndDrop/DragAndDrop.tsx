import {useEffect, useState} from "react";

import styles from "./DragAndDrop.module.scss";

const DragAndDrop: React.FC = () => {
  type TFile = {
    file: File;
    urlFilePreview: string | ArrayBuffer | null;
  } | null;

  const [imageFile, setImageFile] = useState<TFile>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (files) {
      const reader = new FileReader();
      
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const file = {
          file: files[0],
          urlFilePreview: reader.result,
        };
        setImageFile(file)
      };
    }
  };

  return (
    <div className={styles.container}>
      {imageFile ? (
        <img className={styles.image} src={`${imageFile.urlFilePreview}`} />
      ) : (
        <form className={styles.form}>
          <div className={styles.text}>
            <span className={styles.main}>Перетащите фото или выберите файл</span>
            <span className={styles.sub}>Допустимые форматы:
              ai, pdf, tiff</span>
          </div>
          <input
            className={styles.input}
            type="file"
            onChange={handleImageChange}
          />
        </form>
      )}
    </div>
  );
};

export { DragAndDrop };
