// import Loader from "./components/Loader/Loader";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import imageAPI from "./components/services/image-api";
import Loader from "./components/Loader";
import Button from "./components/Button";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [targetImg, setTargetImg] = useState("");
  const [collection, setCollection] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!targetImg) {
      return;
    }
    setStatus(Status.PENDING);

    imageAPI
      .fetchImage(targetImg)
      .then(({ hits }) => {
        setCollection(hits);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError("ERROR");
        setStatus(Status.REJECTED);
        setPage(1);
      });
  }, [targetImg]);

  useEffect(() => {
    if (!targetImg) {
      return;
    }
    imageAPI
      .fetchImage(targetImg, page)
      .then(({ hits }) => {
        setCollection((prevState) => [...prevState, ...hits]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError("ERROR");
        setStatus(Status.REJECTED);
        setPage(1);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onLoadMoreButton = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={setTargetImg} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        draggable={false}
        pauseOnHover={false}
      />
      {status === Status.IDLE && <></>}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <h1>{error}</h1>}
      {status === Status.RESOLVED && (
        <ImageGallery imageCollection={collection} />
      )}
      {collection.length >= 20 && <Button onClick={onLoadMoreButton} />}
    </div>
  );
};
export default App;
