import Box1 from "./Box1";
import Box2 from "./Box2";
import styles from "../styles/Main.module.css";

function Main({ movies }) {
    return (
        <main className={styles.main}>
            <Box1 movies={movies} />
            <Box2 />
        </main>
    );
}

export default Main;
