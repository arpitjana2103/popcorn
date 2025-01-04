import { useEffect, useState } from "react";
import Main from "./components/Main";
import Nav from "./components/Nav";
import "./global.css";

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

// { name: "", poster: "", releaseDate: "", length: "", imdbRating: "", userRating: "" }

function App() {
    // 1. States
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [watchList, setWatchList] = useState([]);

    const [query, setQuery] = useState("spider");
    const [isLoadingMovies, setIsLoadingMovies] = useState(false);
    const [isLoadingMovieDetails, setIsLoadingMovieDetails] = useState(false);

    // 2. Derived States
    const resultCount = movies.length;
    const activeMovieID = movieDetails?.imdbID;

    // 3. Effects
    useEffect(
        function () {
            async function fetchMovies() {
                setIsLoadingMovies(true);
                setMovies([]);

                const response = await fetch(`${API_URL}&s=${query}`);
                const data = await response.json();

                setIsLoadingMovies(false);
                setMovies(data.Search || []);
            }

            if (query.length >= 3) fetchMovies();
            else {
                setMovies([]);
            }
        },
        [query]
    );

    // 4. Handeller Functions

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
        setIsLoadingMovieDetails(true);
        setMovieDetails(null);
        const response = await fetch(`${API_URL}&i=${imdbID}`);
        const data = await response.json();

        // 2. Update movieDetail state
        setIsLoadingMovieDetails(false);
        setMovieDetails(data);
    }

    function handleCloseMovieDetail() {
        setMovieDetails(null);
    }

    function handleAddMovieToWatchList(movieDeatils, userRating) {
        const watchedMovie = {
            name: movieDeatils.Title,
            poster: movieDeatils.Poster,
            releaseDate: movieDeatils.Released,
            runtime: movieDeatils.Runtime,
            imdbRating: Number(movieDeatils.imdbRating),
            userRating: userRating,
            imdbID: movieDeatils.imdbID,
        };

        setWatchList(function (watchList) {
            return [...watchList, watchedMovie];
        });
    }

    // 5. JSX
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
                activeMovieID={activeMovieID}
                handleCloseMovieDetail={handleCloseMovieDetail}
                isLoadingMovies={isLoadingMovies}
                isLoadingMovieDetails={isLoadingMovieDetails}
                handleAddMovieToWatchList={handleAddMovieToWatchList}
                watchList={watchList}
            />
        </div>
    );
}

export default App;
