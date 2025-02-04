import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessages";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResult from "./components/Navbar/NavSearchResult";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList"
import MovieDetails from "./components/Movies/MovieDetails";
import MyListSummary from "./components/SelectedMovies/MyListSummary";
import MyMovieList from "./components/SelectedMovies/MyMovieList"


export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovies, setselectedMovies] = useLocalStorage([], "selectedMovies");

  const { movies, loading, error, currentPage, totalPages, total_results, NextPage, PreviousPage } = useMovies(query);


  function handleaAddToList(movie) {

    setselectedMovies((selectedMovies => {
      if (selectedMovies.some((m) => m.id === movie.id)) {
        return selectedMovies;
      }
      else {
        return [...selectedMovies, movie];
      }
    }));


    handleUnselectedMovie(null);
  }
  function handleDeleteToList(id) {
    setselectedMovies((selectedMovies) => selectedMovies.filter((m) => m.id !== id));
  }
  function handleClearToList() {
    setselectedMovies([]);
  }
  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (id == selectedMovie ? null : id));
  }
  function handleUnselectedMovie() {
    setSelectedMovie(null);
  }
  return (
    <>
      <Nav >
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <NavSearchResult total_results={total_results} ></NavSearchResult>
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-9">
            <ListContainer >
              {loading && <Loading></Loading>}
              {error && <ErrorMessage message={error}></ErrorMessage>}
              {!loading && !error && (
                <>
                  {
                    movies.length > 0 && (
                      <>
                        <MovieList
                          movies={movies}
                          handleSelectedMovie={handleSelectedMovie}
                          selectedMovie={selectedMovie}
                          selectedMovies={selectedMovies}
                          handleaAddToList={handleaAddToList}
                          handleDeleteToList={handleDeleteToList}>
                        </MovieList>
                        <Pagination
                          nextPage={NextPage}
                          previousPage={PreviousPage}
                          currentPage={currentPage}
                          totalPages={totalPages}>
                        </Pagination>
                      </>
                    )
                  }
                </>
              )}
            </ListContainer>
          </div>
          <div className="col-md-3">
            <ListContainer>
              <>
                {selectedMovie ?
                  (<MovieDetails
                    selectedMovie={selectedMovie}
                    handleUnselectedMovie={handleUnselectedMovie}
                    onAddToList={handleaAddToList}
                    selectedMovies={selectedMovies}>
                  </MovieDetails>) :
                  (
                    <>
                      <MyListSummary
                        selectedMovies={selectedMovies}
                        onClearToList={handleClearToList}>
                      </MyListSummary>
                      <MyMovieList
                        selectedMovies={selectedMovies}
                        onDeleteToList={handleDeleteToList}></MyMovieList>
                    </>
                  )}
              </>
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  )
}







