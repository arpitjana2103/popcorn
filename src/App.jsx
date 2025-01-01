import { useEffect, useState } from "react";
import Main from "./components/Main";
import Nav from "./components/Nav";
import "./global.css";

const KEY = "276bfff3";
const API_URL = `http://www.omdbapi.com/?apikey=${KEY}`;

function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(
        function () {
            async function fetchMovies() {
                const response = await fetch(`${API_URL}&s=${query}`);
                const data = await response.json();
                setMovies(data.Search || []);
            }

            if (query.length >= 3) fetchMovies();
        },
        [query]
    );

    function handleChange(e) {
        setQuery(e.target.value);
    }

    return (
        <div>
            <Nav handleChange={handleChange} query={query} />
            <Main movies={movies} />
        </div>
    );
}

export default App;
