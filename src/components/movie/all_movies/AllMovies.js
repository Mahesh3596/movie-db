import { Typography } from "@mui/material"
import { useInfiniteScroll } from "common/customHooks"
import { useEffect, useReducer, useRef, useState } from "react"
import { getAllMovies } from "services/TMDBMovies"
import AllMovieCard from "./AllMovieCard"
import './AllMovies.css'
import GenreDropdown from "./GenreDropdown"
import ScrollTop from "./ScrollTop"

const AllMovies = (props) => {
    let loadMoreRef = useRef(null), pageNum=0;
    const pageReducer = (state, action) => {
        switch(action.type) {
            case 'LOAD_MORE':
                return {...state, page: state.page+1}
            default:
                return state
        }
    }
    const [pager, pagerDispatch] = useReducer(pageReducer, {page: 1})
    useInfiniteScroll(loadMoreRef, pagerDispatch)

    const [movieList, setMovieList] = useState([])
    const [movieConfig, setMovieConfig] = useState({})

    useEffect(() => {
        if(pager.page != pageNum) getMovieData({page: pager.page}); pageNum=pager.page;
    }, [pager])

    const getMovieData = async (filter) => {
        if (movieConfig?.total_pages && filter.page > movieConfig.total_pages) return
        const res = await getAllMovies(filter)
        if (res?.results) {
            setMovieList(prevState => [...prevState, ...res?.results])
            setMovieConfig(prevState => ({...prevState, page: res.page, total_pages: res.total_pages, total_results: res.total_results}))
        }
    }
    return (
        <div className="all-movies">
            <div className="all-movies-filter-section" id="movie-top-anchor">
                <Typography variant="h6" 
                    fontWeight='bold' sx={{color: 'var(--app-bar-primary)', margin: '10px'}}>
                    Popular Movies
                </Typography>
                <GenreDropdown/>
            </div>
            <div style={{marginTop: '20px',  width: '100%'}}>
                <div className="all-movies-content-section">
                    {movieList.map((movie, idx) => <AllMovieCard movie={movie} key={'all-'+movie?.id+idx}/>)}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                    <Typography
                        ref={loadMoreRef} 
                        variant="h6"
                        fontFamily='monospace'
                        fontWeight='bold'
                        color="var(--app-bar-primary)"
                    >
                        {pager.page > movieConfig.total_pages ? 'No More Data to Load' : 'Loading More...'}
                    </Typography>
                </div>
            </div>
            <ScrollTop {...props}/>
        </div>
    )
}

export default AllMovies;