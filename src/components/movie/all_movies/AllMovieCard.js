import { Typography } from "@mui/material"
import Rating from "components/dashboard/trending_movies/Rating"
import { AppContext } from "contexts/AppContext"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import imgPlaceholder from "../../../assets/trending-movies-ph.png"

const AllMovieCard = ({movie}) => {
    const {tmdbConfig} = useContext(AppContext)
    const [imageBaseURL, setImageBaseURL] = useState('')
    useEffect(() => {
        if (!imageBaseURL && tmdbConfig?.images?.secure_base_url) setImageBaseURL(tmdbConfig.images.secure_base_url)
    }, [tmdbConfig])
    return (
        imageBaseURL && movie?.id ? <div className='all-movie-card'>
            <Rating rating={movie.vote_average} voteCount={movie.vote_count}/>
            {movie.poster_path ? <img 
                className='all-img-card'
                loading='lazy'
                style={{width: "120px", maxHeight: "180px"}}
                src={`${imageBaseURL}/w220_and_h330_face${movie.poster_path}`}
                srcSet={`${imageBaseURL}/w220_and_h330_face${movie.poster_path} 1x, ${imageBaseURL}/w440_and_h660_face${movie.poster_path} 2x`} 
                alt={movie.title}/>
            :
                <img 
                    className='all-img-card'
                    style={{width: "120px", maxHeight: "180px"}}
                    src={imgPlaceholder}
                    alt={movie.title}/>}
            <div style={{marginTop: '10px', width: "120px"}}>
                <Typography sx={{fontWeight: 'bold', color: 'var(--app-color-primary)'}} variant='subtitle2'>
                    {movie?.title || movie?.name}
                </Typography>
                <Typography sx={{color: 'var(--app-color-primary)'}} variant='subtitle2'>
                    {moment(movie.release_date).format('MMM DD, YYYY')}
                </Typography>
            </div>
        </div>
        :
        <div className='all-movie-card-placeholder'>
            <Rating rating={0}/>
            <img 
                className='all-img-card'
                style={{width: "120px", maxHeight: "180px"}}
                src={imgPlaceholder}/>
            <div style={{marginTop: '10px', width: "120px"}}>
                <Typography sx={{fontWeight: 'bold', color: 'var(--app-color-primary)'}} variant='subtitle2'>
                    Movie Title
                </Typography>
                <Typography sx={{color: 'var(--app-color-primary)'}} variant='subtitle2'>
                    MMM DD, YYYY
                </Typography>
            </div>
        </div>
    )
}

export default AllMovieCard