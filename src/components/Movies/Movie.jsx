
const api_key = import.meta.env.VITE_API_KEY;


export default function Movie({ movie, onSelectMovie, selectedMovie, selectedMovies, onAddToList, onDeleteToList }) {

    const isAlreadyAdded = selectedMovies.some((m) => m.id === movie.id);

    const fetchMovieDetails = async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}&language=tr-TR`);
        const data = await response.json();
        return data;
    }


    function getClass() {
        if (isAlreadyAdded && selectedMovie === movie.id) {
            return "selected-already-movie";
        } else if (!isAlreadyAdded && selectedMovie === movie.id) {
            return "selected-movie";
        } else if (isAlreadyAdded) {
            return "already-added"
        } else {
            return "movie";
        }
    }

    const HandleClick = () => {
        onSelectMovie(movie.id)
    }
    const handleDoubleClick = async () => {
        if (!isAlreadyAdded) {
            const movieDetails = await fetchMovieDetails(selectedMovie);
            const newMovie = {
                ...movie,
                userRating: 0,
                runtime: movieDetails.runtime
            }
            onAddToList(newMovie);
        }
        else {
            onDeleteToList(movie.id)
        }
    }

    return (
        (
            <div className="col mb-2">
                <div className={`card  ${getClass()}`} onClick={HandleClick} onDoubleClick={handleDoubleClick}>
                    {isAlreadyAdded && <p className="in-list d-flex justify-content-center">Listede</p>}
                    <img src={movie.poster_path ? (`https://media.themoviedb.org/t/p/w440_and_h660_face` + movie.poster_path) : ("../public/img/no-image.jpg")} alt={movie.title} className="card-img-top" />
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>

                        <div className="d-flex justify-content-between">
                            <span>
                                <i className="bi bi-calendar2-date me-1"></i>{movie.release_date}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
