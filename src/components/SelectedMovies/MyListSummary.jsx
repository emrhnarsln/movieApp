
const getAvarage = (array) => array.reduce((sum, value) => sum + value / array.length, 0);

export default function MyListSummary({ selectedMovies, onClearToList }) {

    const avgRating = getAvarage(selectedMovies.map((movie) => (movie.vote_average)));
    const avgUserRating = getAvarage(selectedMovies.map((movie) => (movie.userRating)))
    const avgDuration = getAvarage(selectedMovies.map((movie) => (movie.runtime)));
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5>Listede[{selectedMovies.length}] film bulunmaktadır. </h5>
                <div className="d-flex justify-content-between">
                    <p>
                        <i className="bi bi-star-fill text-warning"></i>
                        <span>{avgRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="bi bi-stars text-warning"></i>
                        <span>{avgUserRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="bi bi-hourglass text-warning"></i>
                        <span>{avgDuration.toFixed(0)}</span>
                    </p>
                </div>
            </div>
            <button className="btn btn-danger me-1 d-flex justify-content-center" onClick={onClearToList}>Listeyi Temizle <i className="bi bi-trash px-2"></i></button>
        </div>
    )
}
