import { FilterAlt, FilterAltOffOutlined, Sort } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useInfiniteScroll } from "common/customHooks"
import { useEffect, useReducer, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getAllMovies } from "services/TMDBMovies"
import AllMovieCard from "./AllMovieCard"
import './AllMovies.css'
import FilterModal from "./FilterModal"
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

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [movieList, setMovieList] = useState([])
    const [movieConfig, setMovieConfig] = useState({})
    const [filterSortObj, setFilterSortObj] = useState({})

    useEffect(() => {
        if(pager.page != pageNum) {
            pageNum=pager.page;
            getMovieData(getSearchParam() ? '/discover/movie' : '/movie/popular', {...getSearchParam(), page: pager.page}); 
        }
    }, [pager, searchParams])
    const getSearchParam = () => {return JSON.parse(searchParams.get('filter'))}

    const getMovieData = async (url, filter) => {
        if (movieConfig?.total_pages && filter.page > movieConfig.total_pages) return
        const res = await getAllMovies(url, filter)
        if (res?.results) {
            setMovieList(prevState => [...prevState, ...res?.results])
            setMovieConfig(prevState => ({...prevState, page: res.page, total_pages: res.total_pages, total_results: res.total_results}))
        }
    }
    const handleFilterClick = (event) => {
        setFilterSortObj({open: true})
    }
    const handleFilterSortClose = () => {
        setFilterSortObj({open: false})
    }
    const onApplyFilter = (filter, isClear=false) => {
        setFilterSortObj({open: false})
        if (isClear)
            navigate({pathname: '/movies'}, { replace: true })
        else
            navigate({pathname: '/movies', search: `?filter=${JSON.stringify(filter)}`}, { replace: true })
        navigate(0);
    }
    return (
        <div className="all-movies">
            <div className="all-movies-title-section" id="movie-top-anchor">
                <Typography variant="h6" 
                    fontWeight='bold' 
                    sx={{color: 'var(--app-bar-primary)', paddingLeft: '15px', width: '80%', alignSelf: 'center'}}>
                    Popular Movies
                </Typography>
                <div style={{width: '20%'}} className="all-movies-filter">
                    {getSearchParam() && <IconButton sx={{color: 'var(--app-bar-primary)', width: 80, height: 40, borderRadius: 0}} onClick={() => onApplyFilter({}, true)}>
                        <Typography>Clear </Typography>
                        <FilterAltOffOutlined/>
                    </IconButton>}
                    <IconButton sx={{color: 'var(--app-bar-primary)'}} onClick={handleFilterClick}><FilterAlt/></IconButton>
                    <IconButton sx={{color: 'var(--app-bar-primary)'}}><Sort/></IconButton>  
                </div>
            </div>
            <div style={{marginTop: '20px',  width: '100%', display: 'flex', flexDirection: 'column'}}>
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
            <FilterModal open={filterSortObj.open} existingFilter={getSearchParam()} 
                handleClose={handleFilterSortClose} onApply={onApplyFilter}/>
        </div>
    )
}

export default AllMovies;