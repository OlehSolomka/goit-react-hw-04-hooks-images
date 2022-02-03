import { Grid } from "react-loader-spinner";
import s from "./loader.module.css";

const Loader = () => {
  return (
    <div role="alert" className={s.wrap}>
      <div className={s.loader}>
        <Grid heigth="52" width="52" color="blue" ariaLabel="grid-loading" />
      </div>
    </div>
  );
};

export default Loader;
