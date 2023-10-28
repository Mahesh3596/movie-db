import { Typography } from "@mui/material"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../contexts/AppContext"
import Rating from "./Rating"

const TrendingMovieCard = ({movie}) => {
    const {tmdbConfig} = useContext(AppContext)
    const [imageBaseURL, setImageBaseURL] = useState('')
    useEffect(() => {
        if (!imageBaseURL && tmdbConfig?.images?.base_url) setImageBaseURL(tmdbConfig.images.base_url)
    }, [tmdbConfig])
    return (
        imageBaseURL && <div className='trending-movie-card'>
            <Rating rating={movie.vote_average}/>
            <img 
                className='trending-img-card'
                loading='lazy'
                style={{maxWidth: "179px", maxHeight: "269px"}}
                src={`${imageBaseURL}/w220_and_h330_face${movie.poster_path}`}
                srcSet={`${imageBaseURL}/w220_and_h330_face${movie.poster_path} 1x, ${imageBaseURL}/w440_and_h660_face${movie.poster_path} 2x`} 
                alt={movie.title}/>
            <div style={{marginTop: '10px'}}>
                <Typography sx={{fontWeight: 'bold', color: 'var(--app-color-primary)'}} variant='subtitle2'>
                    {movie.title}
                </Typography>
                <Typography sx={{color: 'var(--app-color-primary)'}} variant='subtitle2'>
                    {moment(movie.release_date).format('MMM DD, YYYY')}
                </Typography>
            </div>
        </div>
    )
}

export default TrendingMovieCard