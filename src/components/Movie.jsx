import styles from "../styles/Movie.module.css";

function Movie({ image, name, year }) {
    return (
        <div className={styles.movie}>
            <div className={styles.imageBox}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.detailsBox}>
                <h3>{name}</h3>
                <p>{year}</p>
            </div>
        </div>
    );
}

export default Movie;
