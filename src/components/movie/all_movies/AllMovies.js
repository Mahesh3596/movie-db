import { useEffect } from "react"
import { getAllMovies } from "services/TMDBMovies"
import './AllMovies.css'

const AllMovies = () => {
    useEffect(() => {
        getMovieData()
    }, [])
    const getMovieData = async () => {
        const res = await getAllMovies({})
    }
    return (
        <div className="all-movies">
            
        </div>
    )
}

export default AllMovies;