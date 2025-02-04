import { useEffect, useState } from "react";

const api_key = "3ad9df8a5af8f10cf5b1534069133795";

export default function useMovies(query) {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [total_results, setTotalResults] = useState(0);

    function NextPage() {
        setCurrentPage(currentPage + 1);
    }
    function PreviousPage() {
        setCurrentPage(currentPage - 1);
    }

    useEffect(function () {

        if (query == 0) {
            setMovies([]);
            setError("");
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        async function getMovies(page) {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`, { signal: signal });

                if (!response.ok) {
                    throw new Error("Bilinmeyen bir hata oluştu");
                }

                const data = await response.json();

                if (data.total_results === 0) {
                    throw new Error("Film bulunamadı");
                }
                setMovies(data.results);
                setTotalPages(data.total_pages)
                setTotalResults(data.total_results)
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("aborted...");
                } else {
                    setError(err.message);
                }
            }
            setLoading(false);
        }

        getMovies(currentPage);

        return () => {
            controller.abort();
        };

    }, [query, currentPage]);

    return { movies, loading, error, currentPage, totalPages, total_results, NextPage, PreviousPage }
}