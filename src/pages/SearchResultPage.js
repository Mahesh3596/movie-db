import SearchCount from "components/search/SearchCount";
import SearchResults from "components/search/SearchResults";
import { AppContext } from "contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TMDBMovies from "services/TMDBMovies";

const SearchResultPage = ({}) => {
    const {showLoading} = useContext(AppContext)
    const [searchParams] = useSearchParams()
    const {type} = useParams()
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        if (searchResults) setSearchResults(null)
        if (searchParams.get('query')) getAllResults(searchParams.get('query').trim())
    }, [searchParams])

    const getAllResults = async (searchVal) => {
        showLoading(true)
        // const urlSearchAll = `/search/multi?query=${searchVal}`
        const urlMovieAll = `/search/movie?query=${searchVal}`
        const urlTvAll = `/search/tv?query=${searchVal}`
        const urlPersonAll = `/search/person?query=${searchVal}`
        // const allRes = await TMDBMovies.getDetails(urlSearchAll)
        const movieRes = await TMDBMovies.getDetails(urlMovieAll)
        const tvRes = await TMDBMovies.getDetails(urlTvAll)
        const personRes = await TMDBMovies.getDetails(urlPersonAll)
        setSearchResults({
            'Movies': {...movieRes, type: 'movie'},
            'TV Shows': {...tvRes, type: 'tv'},
            'People': {...personRes, type: 'person'},
        })
        showLoading(false)
    }

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', width: '80%', gap: 20, padding: '10px'}}>
            <SearchCount searchResults={searchResults} type={type} searchVal={searchParams.get('query').trim()}/>
            {searchParams && <SearchResults
                type={type}
                searchList={searchResults}
                searchVal={searchParams.get('query').trim()}
                page={searchParams.get('page') || 1}
            />}
        </div>
    </div>)
}

export default SearchResultPage;