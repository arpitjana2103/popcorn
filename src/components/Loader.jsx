import style from "../styles/Loader.module.css";

function Loader() {
    return (
        <div className={style.loaderBox}>
            <div className={style.loader}></div>
        </div>
    );
}

export default Loader;
