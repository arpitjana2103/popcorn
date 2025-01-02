import { useEffect, useState } from "react";
import Main from "./components/Main";
import Nav from "./components/Nav";
import "./global.css";

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(
        function () {
            async function fetchMovies() {
                const response = await fetch(`${API_URL}&s=${query}`);
                const data = await response.json();

                setMovies(data.Search || []);
            }

            if (query.length >= 3) fetchMovies();
            else setMovies([]);
        },
        [query]
    );

    function handleChangeSearchQuery(e) {
        setQuery(e.target.value);
    }

    async function handleMovieCardClick(imdbId) {
        // 1. Fetch movie details with imdbId
        const response = await fetch(`${API_URL}&i=${imdbId}`);
        const data = await response.json();

        // 2. Update movieDetail state
        setMovieDetails(data);
    }

    return (
        <div>
            <Nav handleChange={handleChangeSearchQuery} query={query} />
            <Main movies={movies} handleMovieCardClick={handleMovieCardClick} />
        </div>
    );
}

export default App;
