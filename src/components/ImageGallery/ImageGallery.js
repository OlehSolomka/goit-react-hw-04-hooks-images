import { useState, useEffect } from "react";
import s from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import Loader from "../Loader";
import imageAPI from "../services/image-api";
import Button from "../Button";
import Modal from "../Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function ImageGallery({ searchImg }) {
  const [collection, setCollection] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTabIxd, setActiveTabIxd] = useState(0);

  useEffect(() => {
    if (!searchImg) {
      return;
    }

    setStatus(Status.PENDING);

    imageAPI
      .fetchImage(searchImg)
      .then(({ hits }) => {
        setCollection(hits);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setPage(1);
      });
  }, [searchImg]);

  useEffect(() => {
    if (!searchImg) {
      return;
    }

    imageAPI
      .fetchImage(searchImg, page)
      .then(({ hits }) => setCollection((prevState) => [...prevState, ...hits]))
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
        setPage(1);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onLoadMoreButton = () => {
    setPage((prevState) => prevState + 1);
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  if (status === Status.IDLE) {
    return <></>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return <h1>{error.message}</h1>;
  }
  if (status === Status.RESOLVED) {
    if (collection.length === 0) {
      return <h1 className={s.alert}>No Images found</h1>;
    }
    const activeImg = collection[activeTabIxd];
    return (
      <>
        {showModal && (
          <Modal src={activeImg.webformatURL} onModalToggle={toggleModal} />
        )}
        <ul className={s.imageGallery}>
          {collection.map((image, index) => (
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
        {collection.length >= 20 && <Button onClick={onLoadMoreButton} />}
      </>
    );
  }
}
