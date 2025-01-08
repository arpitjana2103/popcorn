import { useEffect, useRef } from "react";
import styles from "../styles/Search.module.css";

function Search({ query, handleChange }) {
    const inputRef = useRef(null);

    useEffect(function () {
        inputRef.current.focus();
    }, []);

    return (
        <form className={styles.search}>
            <input
                type="text"
                onChange={handleChange}
                value={query}
                ref={inputRef}
            />
            {/* <button>Search</button> */}
        </form>
    );
}

export default Search;
