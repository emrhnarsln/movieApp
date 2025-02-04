import { useEffect, useState } from "react";

const api_key = "3ad9df8a5af8f10cf5b1534069133795";

export default function useMovieDetails(id) {

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        async function getMovieDetails() {
            setLoading(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
            const data = await response.json();
            setLoading(false);
            setMovie(data)
        }


        getMovieDetails();
    }, [id]);

    return { movie, loading }
}