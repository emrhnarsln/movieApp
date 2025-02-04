export default function MyListMovie({ movie, onDeleteToList }) {
    return (
        (
            <div className="card mb-2" >
                <div className="row">
                    <div className="col-3">
                        <img src={movie.poster_path ? (`https://media.themoviedb.org/t/p/w440_and_h660_face` + movie.poster_path) : ("../public/img/no-image.jpg")} alt={movie.title} className="img-fluid rounded" />
                    </div>
                    <div className="col-9 ">
                        <div className="card-body ">
                            <h6 className="card-title">{movie.title}</h6>
                            <div className="row">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="col-4 d-flex ">
                                        <p>
                                            <i className="bi bi-star-fill text-warning "></i>
                                            <span>{movie.vote_average?.toFixed(2)}</span>
                                        </p>
                                    </div>
                                    <div className="col-4 d-flex ">
                                        <p>
                                            <i className="bi bi-stars text-warning"></i>
                                            <span>{movie.userRating}</span>
                                        </p>
                                    </div>
                                    <div className="col-4 d-flex ">
                                        <p>
                                            <i className="bi bi-hourglass text-warning "></i>
                                            <span>{movie.runtime}dk</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-1">
                    <button className="btn btn-danger w-1" onClick={() => (onDeleteToList(movie.id))}>Kaldır</button>
                </div>
            </div>)
    )
}