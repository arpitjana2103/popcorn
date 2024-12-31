import styles from "../styles/WatchedMovie.module.css";
import Emoji from "./Emoji";

function WatchedMovie({ image, name, imdbRating, userRating, length }) {
    return (
        <div className={styles.movie}>
            <div className={styles.imageBox}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.detailsBox}>
                <h3>{name}</h3>
                <div>
                    <span>
                        <Emoji txt="🍅" />
                        <p>{imdbRating}</p>
                    </span>
                    <span>
                        <Emoji txt="⭐️" />
                        <p>{userRating}</p>
                    </span>
                    <span>
                        <Emoji txt="🕗" />
                        <p>{length} min</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default WatchedMovie;
