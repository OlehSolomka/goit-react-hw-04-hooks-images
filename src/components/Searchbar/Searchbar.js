import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [targetImg, setTargetImg] = useState("");

  const handleChange = (e) => {
    setTargetImg(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (targetImg.trim() === "") {
      toast.error("enter search img");
      return;
    }
    onSubmit(targetImg);
    setTargetImg("");
  };
  return (
    <header className={s.bar}>
      <form className={s.form}>
        <button type="submit" className={s.button} onClick={handleSubmit}>
          <span>
            <ImSearch />
          </span>
        </button>

        <input
          onChange={handleChange}
          className={s.input}
          type="text"
          placeholder="Search images and photos"
          value={targetImg}
          name="targetImg"
        />
      </form>
    </header>
  );
};

export default Searchbar;
