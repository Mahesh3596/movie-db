import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { getFormattedDate } from "common/utils";
import { useState } from "react";

const MyFavouriteCard = ({media=null, imageBaseURL='', showLoading=() => {}, showSnackbar=() => {}, refreshCard=() => {}}) => {
    const [popupObj, setPopupObj] = useState({openConfirmation: false})

    const onDelete = () => {
        // setPopupObj({
        //     openConfirmation: true,
        //     onConfirmation: async (resp) => { if (resp === true) await deleteWatchedList(); else setPopupObj({openConfirmation: false}); },
        //     message: 'Are you sure?',
        //     icon: <Warning color="warning" sx={{fontSize: '50px'}}/>
        // })
    }

    return (<div className="favourite-list-item" style={{backgroundImage: `url(${imageBaseURL}w220_and_h330_face${media.backdrop_path})`, backgroundSize: 'cover'}}>
        <div>
            <div style={{display: "flex", width: '100%', alignItems: 'flex-end'}}>
                <div style={{background: 'var(--app-color-secondary)', display: "flex", padding: 2}}>
                    <img
                        style={{width: 50, height: 70}}
                        src={`${imageBaseURL}w220_and_h330_face${media.poster_path}`}
                    />
                </div>
                <div style={{width: 196, alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column'}}>
                    <IconButton sx={{background: 'var(--app-color-secondary)', color: 'var(--app-color-primary)',  padding: 0.5, margin: 1, 
                        '&:hover': {background: 'var(--app-color-secondary)', opacity: 0.75}}}>
                        <Delete sx={{fontSize: '18px'}}/>
                    </IconButton>
                    <div style={{background: 'var(--app-color-secondary)', padding: 5, height: 30, width: 186}}>
                        <Box sx={{color: 'var(--app-color-primary)'}}>
                            <Typography fontWeight='bold' sx={{fontSize: '12px'}}  className="txt-ellipsis-1">{media?.title || media?.name || 'NA'}</Typography>
                            <Typography sx={{fontSize: '12px'}}>{getFormattedDate(media?.release_date || media?.first_air_date, 'MMM DD, YYYY')}</Typography>
                        </Box>
                    </div>
                </div>
            </div>
            <div style={{background: 'var(--app-color-secondary)', padding: 5, height: 55, width: 240, borderRadius: '0 0 10px 10px'}}>
                <Box sx={{color: 'var(--app-color-primary)'}}>
                    <Typography sx={{fontSize: '12px'}} className="txt-ellipsis-3">{media?.overview || 'NA'}</Typography>
                </Box>
            </div>
        </div>
    </div>)
}

export default MyFavouriteCard;