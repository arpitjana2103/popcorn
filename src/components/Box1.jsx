import MovieList from "./MovieList";
import style from "../styles/Box1.module.css";

function Box1({ movies }) {
    return (
        <div className={style.box1}>
            <MovieList movies={movies} />
        </div>
    );
}

export default Box1;
