import styles from "../styles/Search.module.css";

function Search() {
  return (
    <form className={styles.search}>
      <input type="text" />
      <button>Search</button>
    </form>
  );
}

export default Search;
