import { useState } from "react";
import Loading from "../Loading";
import StarRating from "../../StarRating";
import useMovieDetails from "../../hooks/useMovieDetails";

export default function MovieDetails({ selectedMovie, handleUnselectedMovie, selectedMovies, onAddToList }) {


    const [userRating, setUserRating] = useState("");

    const { movie, loading } = useMovieDetails(selectedMovie);

    const isAlreadyAdded = selectedMovies.map((m) => m.id).includes(selectedMovie);

    function handleAddToList() {
        const newMovie = {
            ...movie,
            userRating
        }
        onAddToList(newMovie);
    }

    const selectedMoviUserRating = selectedMovies.find((movie) => (movie.id === selectedMovie))?.userRating;



    return (
        <> {loading ? (<Loading></Loading>)
            : (<div className="border p-2 mb-3">
                <div className="row">
                    <div className="col-4">
                        <img src={movie.poster_path ? (`https://media.themoviedb.org/t/p/w440_and_h660_face` + movie.poster_path) : ("../public/img/no-image.jpg")} alt={movie.title} className="img-fluid rounded" />
                    </div>
                    <div className="col-6">
                        <h6>{movie.title}</h6>
                        <p>
                            <i className="bi bi-calendar2-date me-1"></i>
                            <span>{movie.release_date}</span>
                        </p>
                        <p>
                            <i className="bi bi-star-fill text-warning">
                                <span>{movie.vote_count !== 0 ? movie.vote_average?.toFixed(2) : "not voted yet"}</span>
                            </i>
                        </p>
                    </div>
                    <div className="col-2">
                        <button className="btn  btn-close" onClick={handleUnselectedMovie}></button>
                    </div>
                    <div className="col-12 border-top p-3 mt-3">
                        <p>{movie.overview}</p>
                        <p>{movie.genres?.map((genre) => (<span key={genre.id} className="badge text-bg-primary mt-1">{genre.name}</span>))}</p>
                        {
                            !isAlreadyAdded ?
                                (
                                    <>
                                        <div className="my-2">
                                            <StarRating maxRating={10} size={20} onRating={setUserRating}></StarRating>
                                        </div>
                                        <button className="btn btn-primary me-1" onClick={() => (handleAddToList(movie))} >Listeye Ekle <i className="bi bi-plus "></i>
                                        </button>
                                    </>) :
                                (<p>Değerlendirme Oranınız:  {selectedMoviUserRating ? selectedMoviUserRating : "0"} <i className="bi bi-stars text-warning me-1"></i> </p>)
                        }
                    </div>
                </div>
            </div>)}
        </>
    )
}
