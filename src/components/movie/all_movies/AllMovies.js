import { FilterAlt, FilterAltOffOutlined, Sort } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useInfiniteScroll } from "common/customHooks"
import { getMovieTitleFromURL } from "common/utils"
import { useEffect, useReducer, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import TMDBMovies from "services/TMDBMovies"
import AllMovieCard from "./AllMovieCard"
import './AllMovies.css'
import FilterModal from "./FilterModal"
import ScrollTop from "./ScrollTop"
import SortPopup from "./SortPopup"

const AllMovies = ({pathURL='', filterURL='', ...props}) => {
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
    const [infiniteLoad, setInfiniteLoad]= useState(false)

    useEffect(() => {
        if(pager.page != pageNum) {
            pageNum=pager.page;
            getMovieData(isSearchParam() ? filterURL : '/'+pathURL.split('/').slice(2).join('/'), {...getFilterParam(), sort: getSortParam(), page: pager.page}); 
        }
    }, [pager, searchParams])
    const isSearchParam = () => { return searchParams.get('filter') || searchParams.get('sort') }
    const getFilterParam = () => {return JSON.parse(searchParams.get('filter'))}
    const getSortParam = () => {return searchParams.get('sort')}

    const getMovieData = async (url, filter) => {
        if (movieConfig?.total_pages && filter.page > movieConfig.total_pages) return
        setInfiniteLoad(true)
        const res = await TMDBMovies.getAllMovies(url, filter)
        if (res?.results) {
            setMovieList(prevState => [...prevState, ...res?.results])
            setMovieConfig(prevState => ({...prevState, page: res.page, total_pages: res.total_pages, total_results: res.total_results}))
        }
        setInfiniteLoad(false)
    }
    const handleFilterClick = () => { setFilterSortObj({filterOpen: true}) }
    const handleSortClick = (event) => { setFilterSortObj({sortOpen: true, sortAnchorEl: event.currentTarget}) }
    const handleFilterSortClose = () => { setFilterSortObj({filterOpen: false, sortOpen: false}) }
    const onApplyFilterSort = (filter=null, sort=null, isClear=false) => {
        setFilterSortObj({filterOpen: false})
        if (isClear){
            navigate({pathname: pathURL}, { replace: true })
        } else {
            let search = `?${filter&&sort ? `&filter=${JSON.stringify(filter)}&sort=${sort}`: sort ? `sort=${sort}` : `filter=${JSON.stringify(filter)}`}`
            navigate({pathname: pathURL, search: search}, { replace: true })
        }
        navigate(0);
    }
    return (
        <div className="all-movies">
            <div className="all-movies-title-section" id="movie-top-anchor">
                <Typography variant="h6" 
                    fontWeight='bold' 
                    sx={{color: 'var(--app-bar-primary)', paddingLeft: '15px', width: '80%', alignSelf: 'center'}}>
                    {getMovieTitleFromURL(pathURL)}
                </Typography>
                <div style={{width: '20%'}} className="all-movies-filter">
                    {isSearchParam() && <IconButton onClick={() => onApplyFilterSort(null, null, true)}
                        sx={{color: 'var(--app-bar-primary)', width: 80, height: 40, borderRadius: 10}}>
                        <Typography>Clear </Typography>
                        <FilterAltOffOutlined/>
                    </IconButton>}
                    <IconButton sx={{color: 'var(--app-bar-primary)'}} onClick={handleFilterClick}><FilterAlt/></IconButton>
                    <IconButton sx={{color: 'var(--app-bar-primary)'}} onClick={handleSortClick}><Sort/></IconButton>  
                </div>
            </div>
            <div style={{marginTop: '20px',  width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div className="all-movies-content-section">
                    {movieList.map((movie, idx) => <AllMovieCard movie={movie} key={'all-'+movie?.id+idx}/>)}
                    {infiniteLoad && Array.from({length: 20},(_,i)=>({})).map((movie, idx) => <AllMovieCard movie={movie} key={'all-'+movie?.id+idx}/>)}
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
            <FilterModal open={filterSortObj.filterOpen} existingFilter={getFilterParam()} existingSort={getSortParam()}
                handleClose={handleFilterSortClose} onApply={onApplyFilterSort}/>
            <SortPopup anchorEl={filterSortObj.sortAnchorEl} open={filterSortObj.sortAnchorEl && filterSortObj.sortOpen} 
                handleClose={handleFilterSortClose} onApply={onApplyFilterSort} existingSort={getSortParam()}  existingFilter={getFilterParam()} />
        </div>
    )
}

export default AllMovies;