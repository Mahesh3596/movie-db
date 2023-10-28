import { Typography } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import playIcon from '../../../assets/icon-trailer-play.png'
import { AppContext } from "../../../contexts/AppContext";
import { getUpcomingMovieVideos } from "../../../services/TMDBMovies";
import TrailerPopup from "./TrailerPopup";

const UpcomingTrailerCard = ({movie, imageBaseURL, onThumbnailHover=()=>{}}) => {
    const {showLoading} = useContext(AppContext)
    const [movieVideoData, setMovieVideoData] = useState(null)
    const [trailerPopupObj, setTrailerPopupObj] = useState({open: false, trailerObj: {}})
    useEffect(() => {
        if (movie?.id && !movieVideoData) getMovieData({movieId: movie.id}) 
    }, [movie])
    const getMovieData = async (filter) => {
        showLoading(true)
        const res = await getUpcomingMovieVideos(filter)
        let videoData = res?.results?.find((movie) => {if(movie.type === 'Trailer') return movie})
        videoData = typeof videoData != 'object' ? res?.results[0] : videoData
        setMovieVideoData(prevState => ({
            ...prevState,
            ...videoData
        }))
        showLoading(false)
    }
    const onImageHover = (isMouseOn, obj) => {
        if (isMouseOn) onThumbnailHover(obj.backdrop_path)
        let imageScale = isMouseOn ? '1.05' : '1'
        let playScale = isMouseOn ? '1.3' : '1'
        document.getElementsByClassName(`upcoming-trailer-img-card-${obj.id}`)[0]
        .setAttribute("style", "transform: scale("+imageScale+"); transition: 0.3s; cursor: pointer; border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);");
        document.getElementsByClassName(`upcoming-trailer-play-icon-${obj.id}`)[0]
        .setAttribute("style", "transform: scale("+playScale+"); transition: 0.3s; cursor: pointer;");
    }
    const onHandlePopupClose = () => {
        setTrailerPopupObj(prevState => ({...prevState, open: false, trailerObj: {}}))
    }
    const showTrailerPopup = () => {
        if (trailerPopupObj.open == false) {
            setTrailerPopupObj(prevState => ({...prevState, open: true, trailerObj: movieVideoData}))
        }
    }
    return (
        imageBaseURL && movieVideoData?.key && <div className="upcoming-trailer-card" 
            onMouseOver={() => onImageHover(true, movie)} 
            onMouseLeave={() => onImageHover(false, movie)}
            onClick={showTrailerPopup}>
            <img
                className={`upcoming-trailer-img-card-${movie.id}`}
                loading="lazy"
                style={{maxWidth: "355px", maxHeight: "200px", 
                    transition: '0.3s', cursor: 'pointer', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)'}}
                src={`${imageBaseURL}/w355_and_h200_multi_faces${movie.backdrop_path}`}
                srcSet={`${imageBaseURL}/w355_and_h200_multi_faces${movie.backdrop_path} 1x, ${imageBaseURL}/w710_and_h400_multi_faces${movie.backdrop_path} 2x`}
                alt={movie.title}
            />
            <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80%', cursor: 'pointer'}}>
                <img
                    className={`upcoming-trailer-play-icon-${movie.id}`}
                    src={playIcon}
                />
            </div>
            <div style={{marginTop: '10px'}}>
                <Typography sx={{fontWeight: 'bold', color: 'var(--app-color-secondary)', 
                    display: 'inline-block', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '350px', overflow: 'hidden'}} 
                    variant='h7'>
                    {movie.title}
                </Typography>
                <Typography sx={{color: 'var(--app-color-secondary)',
                    display: 'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '350px', overflow: 'hidden'}} variant='subtitle2'>
                    {movieVideoData?.name ||  moment(movie.release_date).format('MMM DD, YYYY')}
                </Typography>
            </div>
            <TrailerPopup showTrailer={trailerPopupObj.open} 
                trailerObj={trailerPopupObj.trailerObj} 
                handleClose={onHandlePopupClose}/>
        </div>
    )
}

export default UpcomingTrailerCard;