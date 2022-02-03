import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({
  image,
  tags,
  onClick,
  index,
  onModalToggle,
}) {
  return (
    <li
      className={s.item}
      onClick={() => {
        onClick(index);
        onModalToggle();
      }}
    >
      <img src={image} alt={tags} className={s.image} />
    </li>
  );
}
