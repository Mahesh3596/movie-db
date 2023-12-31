import { useContext, useEffect, useState } from 'react';
import './Details.css'
import PrimaryDetails from './PrimaryDetails';
import { AppContext } from 'contexts/AppContext';
import SecondaryDetails from './SecondaryDetails';

const Details = ({details=null, showType=''}) => {
    const {tmdbConfig} = useContext(AppContext)
    const [imageBaseURL, setImageBaseURL] = useState('')
    useEffect(() => {
        if (!imageBaseURL && tmdbConfig?.images?.secure_base_url) setImageBaseURL(tmdbConfig.images.secure_base_url)
    }, [tmdbConfig])

    return (details && <div className='movie-details-container'>
        {details && imageBaseURL && <PrimaryDetails details={details} imageBaseURL={imageBaseURL} showType={showType}/>}
        <SecondaryDetails details={details} imageBaseURL={imageBaseURL} showType={showType}/>
    </div>)
}

export default Details;