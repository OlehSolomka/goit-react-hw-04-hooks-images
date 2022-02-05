// import Loader from "./components/Loader/Loader";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar";
import "./App.css";
import ImageGallery from "./components/ImageGallery";

const App = () => {
  const [targetImg, setTargetImg] = useState("");

  return (
    <div className="app">
      <Searchbar onSubmit={setTargetImg} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        draggable={false}
        pauseOnHover={false}
      />
      <ImageGallery searchImg={targetImg} />
    </div>
  );
};
export default App;
