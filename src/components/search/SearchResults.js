import { useContext, useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import './Search.css'
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/AppContext";
import TMDBMovies from "services/TMDBMovies";

const Pages = ({count=0, type='', searchVal='', pageNum=1}) => {
    const navigate = useNavigate()
    const onPageChange = (e, page) => {
        navigate(`/movie-db/search/${type}?query=${searchVal}&page=${page}`)
    }
    return (count && <Stack spacing={2} sx={{paddingTop: 5, alignItems: 'center'}}>
        <Pagination page={parseInt(pageNum)} count={count} shape="rounded" variant="outlined" onChange={onPageChange}/>
    </Stack>)
}
const SearchList = ({searchRes=null, type='', searchVal='', page=1}) => {
    const {showLoading} = useContext(AppContext)
    const [resp, setResp] = useState(searchRes)
    const [results, setResults] = useState(searchRes?.results || [])
    useEffect(() => {
        if (page > 1) getResults()
    }, [page])
    const getResults = async () => {
        showLoading(true)
        const urlSearch = `/search/${type}?query=${searchVal}&page=${page}`
        const mRes = await TMDBMovies.getDetails(urlSearch)
        setResp(mRes)
        setResults(mRes?.results || [])
        showLoading(false)
    }
    return (<>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-start'}}>
            {results.length > 0 && results.map((result) => <SearchCard data={result} type={type} key={result.id}/>)}
        </div>
        {resp.total_results > 20 && results.length > 0 && <Pages count={searchRes.total_pages} type={type} searchVal={searchVal} pageNum={page}/>}
    </>)
}
const SearchResults = ({searchList=null, type='', searchVal='', page=1}) => {
    return (searchList && <div style={{width: '100%'}}>
        {<SearchList key={type} 
            searchRes={type === 'movie' ? searchList['Movies'] : type === 'tv' ? searchList['TV Shows'] : searchList['People']} 
            type={type} searchVal={searchVal} page={page}
        />}
    </div>)
}

export default SearchResults;