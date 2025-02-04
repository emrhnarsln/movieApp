import MyListMovie from "./MyListMovie"

export default function MyMovieList({ selectedMovies, onDeleteToList }) {
    return (
        selectedMovies.map((movie) => <MyListMovie movie={movie} key={movie.id} onDeleteToList={onDeleteToList}></MyListMovie>
        )
    )
}