import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";
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

export default class ImageGallery extends Component {
  state = {
    searchImg: null,
    error: null,
    status: Status.IDLE,
    page: 1,
    showModal: false,
    activeTabIdx: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevSearchImg = prevProps.searchImg;
    const nextSearchImg = this.props.searchImg;
    const prevPage = prevState.page;
    const nextPage = page;

    if (prevSearchImg !== nextSearchImg) {
      this.setState({ status: Status.PENDING, page: 1 });
      imageAPI
        .fetchImage(nextSearchImg, nextPage)
        .then(({ hits }) =>
          this.setState({ searchImg: hits, status: Status.RESOLVED })
        )
        .catch((error) =>
          this.setState({ error, status: Status.REJECTED, page: 1 })
        );
    }

    if (prevPage !== nextPage) {
      imageAPI
        .fetchImage(nextSearchImg, page)
        .then(({ hits }) =>
          this.setState(({ searchImg }) => ({
            searchImg: [...searchImg, ...hits],
          }))
        )
        .catch((error) =>
          this.setState({ error, status: Status.REJECTED, page: 1 })
        );
    }
  }

  setActiveTabIdx = (idx) => {
    this.setState({ activeTabIdx: idx });
  };

  onLoadMoreButton = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { searchImg, error, status, showModal, activeTabIdx } = this.state;

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
      const activeImg = searchImg[activeTabIdx];
      return (
        <>
          {showModal && (
            <Modal
              src={activeImg.webformatURL}
              onModalToggle={this.toggleModal}
            />
          )}
          <ul className={s.imageGallery}>
            {searchImg.map((image, index) => (
              <ImageGalleryItem
                key={index}
                image={image.webformatURL}
                tag={image.tags}
                onClick={this.setActiveTabIdx}
                onModalToggle={this.toggleModal}
                index={index}
              />
            ))}
          </ul>
          <Button onClick={this.onLoadMoreButton} />
        </>
      );
    }
  }
}
