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
        getAllDetails()
    }, [id])

    const getAllDetails = async () => {
        showLoading(true)
        let urlDetailsEndpoint = type === 'tv' ? `/tv/${id}` : `/movie/${id}`
        let urlCreditEndpoint = type === 'tv' ? `/tv/${id}/credits` : `/movie/${id}/credits`
        let urlKeywordsEndpoint = type === 'tv' ? `/tv/${id}/keywords` : `/movie/${id}/keywords`
        const detailsRes = await TMDBMovies.getDetails(urlDetailsEndpoint+'?append_to_response=release_dates')
        const creditsRes = await TMDBMovies.getCredits(urlCreditEndpoint)
        const keywordsRes = await TMDBMovies.getDetails(urlKeywordsEndpoint)
        setDetails({...detailsRes, 
            cast: creditsRes.cast, 
            crew: creditsRes.crew, 
            keywords: keywordsRes.keywords})
        showLoading(false)
    }
    return (<>
        {details && <Details details={details}/>}
    </>)
}

export default DetailsPage;