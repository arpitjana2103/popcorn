import styles from "../styles/Box2.module.css";
import MovieDetails from "./MovieDetails";
// import WatchedMovieList from "./WatchedMovieList";
// import WatchSummery from "./WatchSummery";

function Box2() {
    return (
        <div className={styles.box2}>
            {/* <WatchSummery />
            <WatchedMovieList /> */}
            <MovieDetails />
        </div>
    );
}

export default Box2;
