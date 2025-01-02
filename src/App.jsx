import { useEffect, useState } from "react";
import Main from "./components/Main";
import Nav from "./components/Nav";
import "./global.css";

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

function App() {
    const [query, setQuery] = useState("spider");
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);

    const resultCount = movies.length;

    useEffect(
        function () {
            async function fetchMovies() {
                const response = await fetch(`${API_URL}&s=${query}`);
                const data = await response.json();

                setMovies(data.Search || []);
            }

            if (query.length >= 3) fetchMovies();
            else {
                setMovies([]);
                // setMovieDetails(null);
            }
        },
        [query]
    );

    function handleChangeSearchQuery(e) {
        setQuery(e.target.value);
    }

    // Click 1 : movieDetail will be null

    async function handleMovieCardClick(imdbID) {
        // 1. MovieCard's imdbID
        // 2. MovieDetail's imdbID

        // Close in 2nd click
        if (movieDetails?.imdbID === imdbID) {
            setMovieDetails(null);
            return;
        }

        // 1. Fetch movie details with imdbId
        const response = await fetch(`${API_URL}&i=${imdbID}`);
        const data = await response.json();

        // 2. Update movieDetail state
        setMovieDetails(data);
    }

    return (
        <div>
            <Nav
                handleChange={handleChangeSearchQuery}
                query={query}
                resultCount={resultCount}
            />
            <Main
                movies={movies}
                handleMovieCardClick={handleMovieCardClick}
                movieDetails={movieDetails}
            />
        </div>
    );
}

export default App;
