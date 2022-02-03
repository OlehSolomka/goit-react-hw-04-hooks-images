import { Component } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    targetImg: "",
  };

  handleChange = (e) => {
    this.setState({
      targetImg: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.targetImg.trim() === "") {
      toast.error("enter search img");
      return;
    }

    this.props.onSubmit(this.state);
    this.setState({
      targetImg: "",
    });
  };

  render() {
    const { targetImg } = this.state;

    return (
      <header className={s.bar}>
        <form className={s.form}>
          <button
            type="submit"
            className={s.button}
            onClick={this.handleSubmit}
          >
            <span>
              <ImSearch />
            </span>
          </button>

          <input
            onChange={this.handleChange}
            className={s.input}
            type="text"
            placeholder="Search images and photos"
            value={targetImg}
            name="targetImg"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
