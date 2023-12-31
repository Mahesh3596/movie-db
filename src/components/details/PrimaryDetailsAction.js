import { Bookmark, Favorite, PlayArrow, PlaylistAdd, PlaylistAddCheck, PushPin, Star } from "@mui/icons-material";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import { getFormattedVoteCount, getRatingRounded } from "common/utils";
import TrailerPopup from "components/dashboard/upcoming_trailers/TrailerPopup";
import ModalAddToWatchedList from "components/mypage/ModalAddToWatchedList";
import { useEffect, useState } from "react";

const PrimaryDetailsAction = ({details=null, showType='', ...props}) => {
    let rating = details.vote_average
    const [trailerObj, setTrailerObj] = useState(null)
    const [trailerPopupObj, setTrailerPopupObj] = useState({open: false, trailerObj: {}})
    const [actionPopup, setActionPopup] = useState({showAddWatchList: false, showAddWatchedList: false})

    useEffect(() => {
        if (details?.id && details?.videos) {
            const trailer = details?.videos?.results?.filter(vid => vid.type.toLowerCase() === 'trailer')[0]
            setTrailerObj(trailer || details?.videos?.results[0])
        }
    }, [details])

    const onHandlePopupClose = () => {
        setTrailerPopupObj(prevState => ({...prevState, open: false, trailerObj: {}}))
    }
    const showTrailerPopup = () => {
        if (trailerPopupObj.open == false) {
            setTrailerPopupObj(prevState => ({...prevState, open: true, trailerObj: trailerObj}))
        }
    }
    const onAddToWatchedList = async () => {
        setActionPopup({showAddWatchedList: true})
    }
    const onAddToWatchList = async () => {
        setActionPopup({showAddWatchList: true})
    }

    return (
        <div style={{padding: '20px 0', display: 'flex', gap: 20, alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        width: 40,
                        background: '#577790', 
                        borderRadius: '50%', 
                        padding: '4px'}}
                >
                    <CircularProgress 
                        {...props}
                        variant="determinate" 
                        value={getRatingRounded(rating)*10} 
                        size={40}
                        sx={{color: `${rating < 4 ? "red" : rating >= 4 && rating < 7 ? "yellow" : "lightgreen"}`}}/>
                    <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <Typography variant="subtitle" component="div" color="white" sx={{fontSize: '15px', fontWeight: '600'}}>
                            {rating ? getRatingRounded(rating) : 'NR'}
                        </Typography>
                    </Box>
                </Box>
                <span style={{fontSize: '15px', color: 'white', fontWeight: 'bold', paddingLeft: '0.5rem'}}>user score<br/>{getFormattedVoteCount(details?.vote_count || 0)}</span>
            </div>
            <Box className='primary-details-action-btn'>
                <Tooltip title="Add To Bucket List"><PlaylistAdd onClick={onAddToWatchList} sx={{fontSize: '20px'}}/></Tooltip>
                
            </Box>
            {/* <Box className='primary-details-action-btn'>
                <Favorite fontSize="10px"/>
            </Box> */}
            {/* <Box className='primary-details-action-btn'><PushPin fontSize="10px"/></Box> */}
            {/* <Box className='primary-details-action-btn'><Bookmark fontSize="10px"/></Box>
            <Box className='primary-details-action-btn'><Star fontSize="10px"/></Box> */}
            <Box className='primary-details-action-btn'>
                <Tooltip title="Add To Watched List"><PlaylistAddCheck onClick={onAddToWatchedList} sx={{fontSize: '20px'}}/></Tooltip>
            </Box>
            {trailerObj && <div style={{display: "flex", alignItems: 'center', color: 'white', gap: 5, cursor: 'pointer', fontWeight: '600'}} onClick={showTrailerPopup}>
                <PlayArrow/> Play {trailerObj?.type}
            </div>}
            <TrailerPopup showTrailer={trailerPopupObj.open} 
                trailerObj={trailerPopupObj.trailerObj} 
                handleClose={onHandlePopupClose}/>
            <ModalAddToWatchedList open={actionPopup?.showAddWatchedList} details={details} showType={showType} onModalClose={() => setActionPopup({showAddWatchedList: false})}/>
        </div>
    )
}

export default PrimaryDetailsAction;