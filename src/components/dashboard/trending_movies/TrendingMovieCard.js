import { Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../contexts/AppContext"

const TrendingMovieCard = ({movie}) => {
    const {tmdbConfig} = useContext(AppContext)
    const [imageBaseURL, setImageBaseURL] = useState('')
    useEffect(() => {
        if (!imageBaseURL && tmdbConfig?.images?.base_url) setImageBaseURL(tmdbConfig.images.base_url)
    }, [tmdbConfig])
    return (
        imageBaseURL && <div className='trending-movie-card'>
            <img 
                className='trending-img-card'
                loading='lazy'
                src={`${imageBaseURL}/w220_and_h330_face${movie.poster_path}`}
                srcSet={`${imageBaseURL}/w220_and_h330_face${movie.poster_path} 1x, ${imageBaseURL}/w440_and_h660_face${movie.poster_path} 2x`} 
                alt={movie.title}/>
            <div style={{marginTop: '10px'}}>
                <Typography sx={{textAlign: 'left', fontWeight: 'bold', color: '#194569', alignSelf: 'center'}} variant='h7'>
                    {movie.title}
                </Typography>
                <Typography sx={{textAlign: 'left', color: '#194569', alignSelf: 'center'}} variant='subtitle2'>
                    {movie.release_date}
                </Typography>
            </div>
        </div>
    )
}

export default TrendingMovieCard