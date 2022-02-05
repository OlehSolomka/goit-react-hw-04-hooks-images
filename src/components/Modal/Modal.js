import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ src, onModalToggle }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        onModalToggle();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onModalToggle]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onModalToggle();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
