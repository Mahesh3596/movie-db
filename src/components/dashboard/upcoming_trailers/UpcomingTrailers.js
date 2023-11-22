import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'contexts/AppContext';
import UpcomingTrailerCard from './UpcomingTrailerCard';
import './UpcomingTrailers.css'

const UpcomingTrailers = ({upComingMovies=null, onChangeUpcomingMovies=()=>{}}) => {
    const {tmdbConfig} = useContext(AppContext)
    const [imageBaseURL, setImageBaseURL] = useState(null)
    const [backdrop, setBackdrop] = useState('')

    useEffect(() => {
        if (!imageBaseURL && tmdbConfig?.images?.secure_base_url) setImageBaseURL(tmdbConfig.images.secure_base_url)
    }, [tmdbConfig])
    useEffect(() => {
        if (upComingMovies?.results) setBackdrop(`${imageBaseURL}/w1920_and_h427_multi_faces${upComingMovies?.results[0]?.backdrop_path}`)
    }, [imageBaseURL, upComingMovies])

    const onThumbnailHover = (backdrop_path) => {
        setBackdrop(`${imageBaseURL}/w1920_and_h427_multi_faces${backdrop_path}`)
    }
    return (
        <div className='upcoming-trailers'>
            <div style={{width: '81.2%', display: 'flex', justifyContent: 'center', overflowX: 'auto', marginTop: '5px', backgroundImage: `url(${backdrop})`}}>
                <div style={{background: 'linear-gradient(to right, rgb(25 69 105 / 50%) 0%, rgb(219 235 244 / 50%) 100%', 
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{alignSelf: 'left', width: '100%'}}>
                        <Typography  className="txt-ellipsis-1"
                            sx={{fontWeight: 'bold', color: 'white', padding: '20px 30px 0 30px'}} 
                            variant='h6'>
                            Recent & Upcoming Movie Trailers
                        </Typography>
                    </div>
                    <div className='upcoming-trailer-list-container'>
                        {imageBaseURL && upComingMovies?.results?.map((movie) => (
                            <UpcomingTrailerCard movie={movie} imageBaseURL={imageBaseURL} key={'ut'+movie.id} onThumbnailHover={onThumbnailHover}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingTrailers;