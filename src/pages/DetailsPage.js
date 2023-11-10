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
        let urlEndpoint = type === 'tv' ? '/tv/${id}' : `/movie/${id}`
        const res = await TMDBMovies.getDetails(urlEndpoint)
        setDetails(res)
        showLoading(false)
    }
    return (<>
        <Details details={details}/>
    </>)
}

export default DetailsPage;