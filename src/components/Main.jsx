import Box1 from "./Box1";
import Box2 from "./Box2";
import styles from "../styles/Main.module.css";

function Main({ movies, handleMovieCardClick, movieDetails }) {
    return (
        <main className={styles.main}>
            <Box1 movies={movies} handleMovieCardClick={handleMovieCardClick} />
            <Box2 movieDetails={movieDetails} />
        </main>
    );
}

export default Main;
