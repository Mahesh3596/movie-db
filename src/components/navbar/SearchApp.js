import { Close, Search } from "@mui/icons-material";
import { Box, CircularProgress, InputAdornment, TextField, Typography } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { useContext, useState } from "react";
import TMDBMovies from "services/TMDBMovies";
import imgPlaceholder from "../../assets/trending-movies-ph.png"
import { getCamelcase, getFormattedDate, getGender } from "common/utils";
import './SearchApp.css'
import { useNavigate } from "react-router-dom";

const SearchApp = ({}) => {
    const {tmdbConfig} = useContext(AppContext)
    const navigate = useNavigate()
    const [searchList, setSearchList] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [timer, setTimer] = useState(null)
    const [showResults, setShowResults] = useState(false)

    const onInputSearch = (e) => { 
        setSearch(e.target.value); 
        clearTimeout(timer)
        const newTimer = setTimeout(async() => {
            await onSearch(e.target.value)
        }, 500)
        setTimer(newTimer)
    }
    const onSearch = async (searchVal) => {        
        let value = searchVal.trim()
        if (value.length > 0) {
            await getSearchData(value)
        } else {
            clearSearch()
        }
    }
    const onResultClick = (search) => {
        if (!search) return
        if (search.media_type==='movie') navigate(`/movie-db/movie/details/${search.id}`)
        if (search.media_type==='tv') navigate(`/movie-db/tv/details/${search.id}`)
    }

    const getSearchData = async (searchValue) => {
        setIsLoading(true)
        const searchRes = await TMDBMovies.getDetails('/search/multi'+`?query=${searchValue}`)
        setSearchList(searchRes.results)
        setIsLoading(false)
    }
    const getLanguage = (language='') => {
        let orgLang=null;
        if (language && tmdbConfig?.languages.length > 0) {
            orgLang = tmdbConfig.languages.filter(lang => lang.iso_639_1 === language)
        }
        return orgLang?.length > 0 ? orgLang[0].english_name : '-'
    }
    const clearSearch = () => {
        setSearch('')
        setSearchList(null)
        setShowResults(false)
        clearTimeout(timer)
        setTimer(null)
    }
    const onViewAllClick = () => {
        navigate(`movie-db/search/movie?query=${search}`)
        clearSearch()
    }

    return (<div style={{justifySelf: 'end', width: '300px', position: 'relative'}}>
        <TextField
            variant='standard'
            placeholder="search anything here"
            sx={{ width: '100%' }}
            value={search}
            onInput={onInputSearch}
            onFocus={e => setShowResults(true)}
            onBlur={e => setTimeout(() => setShowResults(false), 300)}
            InputProps={{
                style: {background: 'white', padding: '0 0 0 10px', borderRadius: '5px'},
                endAdornment: (
                <InputAdornment sx={{color: 'white', marginRight: '5px'}} position="end">
                    {search && <Close sx={{color: 'grey', width: '17px', cursor: 'pointer'}} onClick={() => {setSearch(''); setSearchList(null);}}/>}
                    {isLoading ? <CircularProgress size="20px" thickness={5} sx={{color: 'var(--app-color-primary)'}}/> : 
                        <Search sx={{color: 'var(--app-color-primary)'}}/>}
                </InputAdornment>
                )
            }}
        />
        {showResults && searchList?.length > 0 && <div className="search-results-container">
            {searchList.map(search => <div key={search.id} onClick={() => onResultClick(search)}
                style={{width: '93%', color: "var(--app-color-primary)", padding: '0 10px'}}>
                    <div className="search-result">
                        {tmdbConfig?.images?.secure_base_url && (search?.poster_path || search?.profile_path) ? <img style={{width: '60px'}}
                            src={`${tmdbConfig.images.secure_base_url}w185${search?.poster_path || search?.profile_path}`}
                        />:
                        <img style={{width: '60px'}} src={imgPlaceholder}/>}
                        <Box sx={{width: '75%', marginLeft: '10px'}}>
                            <Typography fontSize="small">Type: {getCamelcase(search?.media_type || '')}</Typography>
                            <Typography fontSize="small" fontWeight='bold' sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>{search?.name || search?.title}</Typography>
                            {search?.media_type === 'person' ? <Typography fontSize="small">Department: {search?.known_for_department}</Typography> : 
                                <Typography fontSize="small">Released On: {getFormattedDate(search?.release_date || search?.first_air_date, 'MMM DD, YYYY')}</Typography>}
                            {search?.media_type === 'person' ? <Typography fontSize="small">Gender: {getGender(search?.gender)}</Typography> :
                                <Typography fontSize="small">Language: {getLanguage(search?.original_language)}</Typography>}
                        </Box>
                    </div>
                <hr/>
            </div>)}            
        </div>}
        {showResults && searchList?.length > 4 && <div className="viewall-search-results" onClick={onViewAllClick}>
            <Typography>View All Results</Typography>
        </div>}
    </div>)
}

export default SearchApp;