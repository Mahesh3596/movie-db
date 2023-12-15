import { Tooltip, Typography } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import imgMediaPlaceholder from "../../assets/trending-movies-ph.png"
import imgProfilePlaceholder from "../../assets/profile-ph.png"
import { getFormattedDate } from "common/utils";
import { useNavigate } from "react-router-dom";

const SearchCard = ({data=null, type=''}) => {
    const {tmdbConfig} = useContext(AppContext)
    const navigate = useNavigate()
    const [imageBaseURL, setImageBaseURL] = useState('')

    useEffect(() => {if (!imageBaseURL && tmdbConfig?.images?.secure_base_url) setImageBaseURL(tmdbConfig.images.secure_base_url)}, [tmdbConfig])
    const onSearchItemClick = () => {
        navigate(`/movie-db/${type}/details/${data.id}`)
    }

    return (<div className="search-card" onClick={onSearchItemClick}>
        {imageBaseURL && (data?.poster_path || data.profile_path) ? <img
            loading='lazy'
            style={{width: "100%"}}
            src={`${imageBaseURL}w220_and_h330_face${type==='person' ? data.profile_path : data.poster_path}`}
        />
        :
        <img
            style={{width: "100%", height: '100%'}}
            src={type==='person' ? imgProfilePlaceholder : imgMediaPlaceholder}
        />}
        <div className="search-card-details">
            <div style={{padding: '10px'}}>
                <Tooltip title={data.title}>
                    <Typography className="txt-ellipsis-1" sx={{fontWeight: 'bold', fontSize: "12px"}}>{data?.title || data?.original_name || data?.name || 'NA'}</Typography>
                </Tooltip>
                <Typography className="txt-ellipsis-1" variant='body2' sx={{fontSize: "12px", color: 'grey'}}>
                    {type==='person' ? data.known_for_department : getFormattedDate(data?.release_date || data?.first_air_date, 'MMM DD, YYYY')}
                </Typography>
                {type==='person' ? 
                <Typography className="txt-ellipsis-3" variant="body1" sx={{paddingTop: '5px', fontSize: "12px"}}>
                    {data?.known_for ? data.known_for.map(item => item?.title || item?.name || 'NA').join(',') : 'not available!'}
                </Typography> :
                <Typography className="txt-ellipsis-3" variant="body1" sx={{paddingTop: '5px', fontSize: "12px"}}>{data?.overview || 'overview not available!'}</Typography>}
            </div>
        </div>
    </div>)
}

export default SearchCard;