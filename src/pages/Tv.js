import AllMovies from "components/movie/all_movies/AllMovies";
import { useLocation } from "react-router-dom";

const Tv = () => {
    const location = useLocation()
    const {pathname} = location
    return (
        <AllMovies key={pathname} pathURL={pathname} filterURL='/discover/tv'/>
    )
}

export default Tv;