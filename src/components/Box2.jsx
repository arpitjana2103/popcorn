import styles from "../styles/Box2.module.css";
import WatchedMovieList from "./WatchedMovieList";
import WatchSummery from "./WatchSummery";

function Box2() {
    return (
        <div className={styles.box2}>
            <WatchSummery />
            <WatchedMovieList />
        </div>
    );
}

export default Box2;
