import Details from "components/details/Details";
import { AppContext } from "contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TMDBMovies from "services/TMDBMovies";

const DetailsPage = () =>{
    const {showLoading}= useContext(AppContext)
    const {type, id} = useParams()
    const [details, setDetails] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        getAllDetails()
    }, [id])

    const getAllDetails = async () => {
        showLoading(true)
        let urlDetailsEndpoint = type === 'tv' ? `/tv/${id}` : `/movie/${id}`
        let urlCreditEndpoint = type === 'tv' ? `/tv/${id}/credits` : `/movie/${id}/credits`
        let urlKeywordsEndpoint = type === 'tv' ? `/tv/${id}/keywords` : `/movie/${id}/keywords`
        let urlReleaseEndpoint = type === 'tv' ? `/tv/${id}/content_ratings` : `/movie/${id}/release_dates`
        const detailsRes = await TMDBMovies.getDetails(urlDetailsEndpoint+'?append_to_response=videos,images')
        const creditsRes = await TMDBMovies.getCredits(urlCreditEndpoint)
        const keywordsRes = await TMDBMovies.getDetails(urlKeywordsEndpoint)
        const releaseRes = await TMDBMovies.getDetails(urlReleaseEndpoint)
        setDetails({...detailsRes, 
            cast: creditsRes.cast, 
            crew: creditsRes.crew, 
            keywords: keywordsRes?.keywords || keywordsRes?.results || [],
            release: releaseRes?.results?.filter((rel) => rel.iso_3166_1==='IN')?.[0] || releaseRes?.results?.[0] || []})
        showLoading(false)
    }
    return (<>
        {details && <Details details={details} showType={type}/>}
    </>)
}

export default DetailsPage;