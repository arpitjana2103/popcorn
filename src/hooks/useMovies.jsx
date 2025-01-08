import { useEffect, useState } from "react";

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoadingMovies, setIsLoadingMovies] = useState(false);

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

    return { movies, isLoadingMovies };
}

export default useMovies;
