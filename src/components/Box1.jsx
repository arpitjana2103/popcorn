import MovieList from "./MovieList";
import style from "../styles/Box1.module.css";

function Box1({ movies, handleMovieCardClick }) {
    return (
        <div className={style.box1}>
            <MovieList
                movies={movies}
                handleMovieCardClick={handleMovieCardClick}
            />
        </div>
    );
}

export default Box1;
