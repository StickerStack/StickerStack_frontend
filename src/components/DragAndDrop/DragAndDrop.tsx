import {useEffect, useState} from "react";

import styles from "./DragAndDrop.module.scss";
import {ImagePick} from "../ImagePick/ImagePick";
import {ButtonWithText} from "../UI";

const DragAndDrop: React.FC = () => {
  type TFile = {
    file: File;
    urlFilePreview: string | ArrayBuffer | null;
  } | null;

  const allowedTypeFile = ["image/png", "image/jpeg", "image/jpg"]

  const [imageFile, setImageFile] = useState<TFile>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;


    if (files && allowedTypeFile.includes(files[0].type)) {
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
        <ImagePick onLoadImage={handleImageChange} deleteImage={() => setImageFile(null)} image={imageFile.urlFilePreview} />

      ) : (
        <div className={styles.dnd}>
          <div className={styles.text}>
            <span className={styles.main}>Перетащите фото или выберите файл</span>
            <span className={styles.sub}>Допустимые форматы: .jpg, .jpeg, .png</span>
          </div>
          <input
            className={styles.input}
            type="file"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
          />
        </div>
      )}
    </div>
  );
};

export { DragAndDrop };
