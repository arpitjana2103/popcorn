import styles from "../styles/MovieDetails.module.css";
import Emoji from "./Emoji";
import StarRating from "./StarRating";
import { formatMovieLength } from "../helper";

function MovieDetails({
    movieDetails,
    handleCloseMovieDetail,
    handleAddMovieToWatchList,
}) {
    const {
        Title: title,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movieDetails;

    function handleAction(userRating) {
        handleAddMovieToWatchList(movieDetails, userRating);
    }

    return (
        <div className={styles.movieDetails}>
            <button
                onClick={handleCloseMovieDetail}
                className={styles.closeMovie}
            >
                <Emoji txt="❌" />
            </button>
            <div className={styles.details}>
                <img
                    src={
                        poster === "N/A"
                            ? "https://blocks.astratic.com/img/general-img-portrait.png"
                            : poster
                    }
                    alt={title}
                />
                <div>
                    <h3>{title}</h3>
                    <p>
                        {released} • {formatMovieLength(runtime)} {genre}
                    </p>
                    <p>
                        <Emoji txt="🍅" /> {imdbRating} Tomatos
                    </p>
                </div>
            </div>

            <StarRating
                color="#fa5252"
                defaultRating={0}
                size={10}
                action={handleAction}
            />

            <div className={styles.description}>
                <p>
                    <strong>PLOT : </strong>
                    {plot}
                </p>
                <p>
                    <strong>Starring by : </strong>
                    {actors}
                </p>
                <p>
                    <strong>Directed by : </strong>
                    {director}
                </p>
            </div>
        </div>
    );
}

export default MovieDetails;
