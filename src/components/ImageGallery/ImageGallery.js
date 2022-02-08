import s from "./ImageGallery.module.css";
import { useState } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../Modal";

export default function ImageGallery({ imageCollection }) {
  const [showModal, setShowModal] = useState(false);
  const [activeTabIxd, setActiveTabIxd] = useState(0);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const activeImg = imageCollection[activeTabIxd];
  return (
    <>
      {showModal && (
        <Modal src={activeImg.webformatURL} onModalToggle={toggleModal} />
      )}
      <ul className={s.imageGallery}>
        {imageCollection.map((image, index) => (
          <ImageGalleryItem
            key={index}
            image={image.webformatURL}
            tag={image.tags}
            onClick={setActiveTabIxd}
            onModalToggle={toggleModal}
            index={index}
          />
        ))}
      </ul>
    </>
  );
}
