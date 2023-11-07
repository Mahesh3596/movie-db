import AllMovies from "components/movie/all_movies/AllMovies";
import { useLocation } from "react-router-dom";

const Movie = () => {
    const location = useLocation()
    const {pathname} = location
    return (
        <AllMovies key={pathname} pathURL={pathname} filterURL='/discover/movie'/>
    )
}

export default Movie;