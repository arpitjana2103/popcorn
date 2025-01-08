import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import "./global.css";
import Main from "./components/Main";
import Box1 from "./components/Box1";
import Box2 from "./components/Box2";
import MovieList from "./components/MovieList";
import Message from "./components/Message";
import Emoji from "./components/Emoji";
import Loader from "./components/Loader";
import useMovies from "./hooks/useMovies";

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

function App() {
    // 1. States
    const [query, setQuery] = useState("");
    const [movieDetails, setMovieDetails] = useState(null);
    const [watchList, setWatchList] = useState(function () {
        const data = JSON.parse(localStorage.getItem("watchList"));
        if (data) return data;
        else return [];
    });
    const { movies, isLoadingMovies } = useMovies(query);
    const [isLoadingMovieDetails, setIsLoadingMovieDetails] = useState(false);

    // 2. Derived States
    const resultCount = movies.length;
    const activeMovieID = movieDetails?.imdbID;

    // 3. Effects

    // 3.2 >> Save Updated watchlist into LocalStorage after every Render
    useEffect(
        function () {
            localStorage.setItem("watchList", JSON.stringify(watchList));
        },
        [watchList]
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

    function handleAddMovieToWatchList(movieDetails, userRating) {
        const watchedMovie = {
            name: movieDetails.Title,
            poster: movieDetails.Poster,
            releaseDate: movieDetails.Released,
            runtime: movieDetails.Runtime,
            imdbRating: Number(movieDetails.imdbRating),
            userRating: userRating,
            imdbID: movieDetails.imdbID,
        };

        const index = watchList.findIndex(function (movie) {
            return movie.imdbID === movieDetails.imdbID;
        });

        if (index !== -1) {
            watchList[index] = watchedMovie;
            setWatchList(function (watchList) {
                return [...watchList];
            });
        } else {
            setWatchList(function (watchList) {
                return [...watchList, watchedMovie];
            });
        }
    }

    function handleRemoveMovieToWatchList(imdbID) {
        setWatchList(function (watchList) {
            watchList = watchList.filter(function (movie) {
                return movie.imdbID !== imdbID;
            });
            return [...watchList];
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

            <Main>
                <Box1>
                    {isLoadingMovies && <Loader />}

                    {!isLoadingMovies && movies.length === 0 ? (
                        <Message>
                            <Emoji txt="🚫" /> No Movie Found !
                        </Message>
                    ) : (
                        <MovieList
                            movies={movies}
                            handleMovieCardClick={handleMovieCardClick}
                            activeMovieID={activeMovieID}
                        />
                    )}
                </Box1>

                <Box2
                    movieDetails={movieDetails}
                    handleCloseMovieDetail={handleCloseMovieDetail}
                    isLoadingMovieDetails={isLoadingMovieDetails}
                    handleAddMovieToWatchList={handleAddMovieToWatchList}
                    watchList={watchList}
                    handleRemoveMovieToWatchList={handleRemoveMovieToWatchList}
                />
            </Main>
        </div>
    );
}

export default App;
