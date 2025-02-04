import Movie from "./Movie"

export default function MovieList({ movies, handleSelectedMovie, selectedMovie, selectedMovies, handleaAddToList, handleDeleteToList }) {

    return (
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
            {
                movies.map((movie) => <Movie movie={movie}
                    key={movie.id}
                    onSelectMovie={handleSelectedMovie}
                    selectedMovie={selectedMovie}
                    selectedMovies={selectedMovies}
                    onAddToList={handleaAddToList}
                    onDeleteToList={handleDeleteToList}>
                </Movie>)
            }
        </div>
    )
}