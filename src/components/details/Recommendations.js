import { AppContext } from "contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import TMDBMovies from "services/TMDBMovies";
import imgPlaceholder from "../../assets/upcoming-trailer-ph.png"
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Recommendations = ({details=null, imageBaseURL='', showType=''}) => {
    const {showLoading} = useContext(AppContext)
    const navigate = useNavigate()
    const [recommnList, setRecommnList] = useState([])

    useEffect(() => {
        if (details.id) getRecommendations()
    }, [details])
    const getRecommendations = async () => {
        showLoading(true)
        let recommnEndpoint = showType==='tv' ? `/tv/${details.id}/recommendations` : `/movie/${details.id}/recommendations`
        const recommonRes = await TMDBMovies.getDetails(recommnEndpoint)
        setRecommnList(recommonRes.results)
        showLoading(false)
    }
    const onItemClick = (recommn) => {
        if (!recommn?.id) return
        if (showType === 'movie') navigate(`/movie-db/movie/details/${recommn.id}`)
        if (showType === 'tv') navigate(`/movie-db/tv/details/${recommn.id}`)
    }

    return (<div>
        <Typography variant="h6" fontWeight='bold'>Recommendations</Typography>
        <div style={{display: 'flex', width: '100%', overflow: 'auto', gap: 20, padding: '10px 0'}}>
            {recommnList.length <= 0 && <Typography>We don't have enough data to suggest any movies.</Typography>}
            {recommnList.length > 0 && recommnList.map(recommn => <div key={recommn.id} onClick={() => onItemClick(recommn)}>
                <div className="recommn-img">
                    {recommn?.backdrop_path ? <img width="250px" src={`${imageBaseURL}w300${recommn.backdrop_path}`} 
                        style={{borderRadius: '10px'}}/>
                    :
                    <img width="250px" src={imgPlaceholder} 
                        style={{borderRadius: '10px'}}/>}
                    <Box className="recommn-release-hidden">
                        <CalendarMonth sx={{paddingRight: '5px', fontSize: '15px'}}/>
                        {showType === 'movie' && <Typography sx={{fontSize: '15px'}}>{recommn?.release_date ? moment(recommn.release_date).format('DD/MM/YYYY') : ''}</Typography>}
                        {showType === 'tv' && <Typography sx={{fontSize: '15px'}}>{recommn?.first_air_date ? moment(recommn.first_air_date).format('DD/MM/YYYY') : ''}</Typography>}
                    </Box>
                </div>
                <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'auto auto'}}>
                    <Typography sx={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', paddingRight: '10px', fontSize: '14px'}}>{recommn?.title || recommn?.name || ''}</Typography>
                    <Typography sx={{justifySelf: 'flex-end', fontSize: '14px'}}>{recommn?.vote_average ? Math.ceil(recommn.vote_average*10)+'%' : ''}</Typography>
                </Box>
            </div>)}
        </div>
    </div>)
}

export default Recommendations;