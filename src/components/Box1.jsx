import style from "../styles/Box1.module.css";

function Box1({ children }) {
    return <div className={style.box1}>{children}</div>;
}

export default Box1;
