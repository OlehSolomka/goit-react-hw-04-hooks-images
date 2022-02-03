// import Loader from "./components/Loader/Loader";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar";
import "./App.css";
import ImageGallery from "./components/ImageGallery";

class App extends Component {
  state = {
    targetImg: "",
  };

  getImage = ({ targetImg }) => {
    this.setState({ targetImg });
  };

  render() {
    const { targetImg } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.getImage} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          draggable={false}
          pauseOnHover={false}
        />
        <ImageGallery searchImg={targetImg} />
      </div>
    );
  }
}

export default App;
