import { Delete, Edit, Favorite, FavoriteBorder, RemoveRedEye, Star, Warning } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { getFormattedDate } from "common/utils";
import ModalAddToWatchedList from "./ModalAddToWatchedList";
import { useState } from "react";
import ModalViewWatchedList from "./ModalViewWatchedList";
import MyPageService from "services/MyPageService";
import ConfirmationModal from "components/common/ConfirmationModal";

const MyWatchedListCard = ({media=null, imageBaseURL='', showLoading=() => {}, showSnackbar=() => {}}) => {
    const [popupObj, setPopupObj] = useState({openEditPopup: false, openViewPopup: false, openConfirmation: false})

    const onDelete = () => {
        setPopupObj({
            openConfirmation: true,
            onConfirmation: async (resp) => { if (resp === true) await deleteWatchedList(); else setPopupObj({openConfirmation: false}); },
            message: 'Are you sure?',
            icon: <Warning color="warning" sx={{fontSize: '50px'}}/>
        })
    }
    const deleteWatchedList = async () => {
        showLoading(true)
        const res = await MyPageService.removeWatchedList(media.id)
        if (res.success) {
            // showSnackbar({show: true, message: 'Removed from watched list!', type: 'success'})
            setPopupObj({openConfirmation: false})
            window.location.reload()
        }
        showLoading(false)
    }

    return (<div className="watched-list-item">
    <div className="watched-list-poster">
        <img
            id={`media-poster-${media.id}`}
            src={`${imageBaseURL}w220_and_h330_face${media.poster_path}`}
        />
    </div>
    
    <Box sx={{color: 'var(--app-color-primary)', paddingLeft: '10px', width: '90%', alignSelf: 'center'}}>
        <Box sx={{display: 'flex', marginTop: '5px'}}>
            <Typography fontWeight='bold'>{media?.title || media?.name || 'NA'}</Typography>
            {media?.my_rating && <Typography sx={{display: 'flex', justifyItems: 'center'}}>&nbsp;- {media?.my_rating}<Star sx={{fontSize: '15px', alignSelf: 'center'}}/></Typography>}
        </Box>
        <Typography sx={{fontSize: '14px', marginTop: '5px'}} className="txt-ellipsis-2">{media?.overview || 'NA'}</Typography>
        <Box sx={{display: 'flex', marginTop: '5px'}}>
            <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>Watched On :&nbsp;</Typography>
            <Typography sx={{fontSize: '14px'}}>{getFormattedDate(media?.watched_on, 'MMM DD, YYYY')}</Typography>
        </Box>
        <Box sx={{display: 'grid', marginTop: '5px', gridTemplateColumns: 'auto auto 1fr'}}>
            <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>Watched At :&nbsp;</Typography>
            <Typography sx={{fontSize: '14px'}} className="txt-ellipsis-1">{media?.watched_at || 'NA'}</Typography>
            <Box sx={{justifySelf: 'flex-end', paddingRight: '10px', display: 'flex'}}>
                <IconButton onClick={() => setPopupObj({openViewPopup: true})}>
                    <RemoveRedEye fontSize="small" sx={{cursor: 'pointer', color: 'var(--app-color-primary)'}}/>
                </IconButton>
                <IconButton>
                    <FavoriteBorder fontSize="small" sx={{cursor: 'pointer', color: 'var(--app-color-primary)'}}/>
                </IconButton>
                <IconButton onClick={() => setPopupObj({openEditPopup: true})}>
                    <Edit fontSize="small" sx={{cursor: 'pointer', color: 'var(--app-color-primary)'}}/>
                </IconButton>
                <IconButton onClick={() => onDelete()}>
                    <Delete fontSize="small" sx={{cursor: 'pointer', color: 'var(--app-color-primary)'}}/>
                </IconButton>
            </Box>
        </Box>
    </Box>
    {popupObj.openEditPopup && <ModalAddToWatchedList mode='edit' open={popupObj.openEditPopup} details={media} showType={media.type} onModalClose={() => setPopupObj({openEditPopup: false})}/>}
    {popupObj.openViewPopup && <ModalViewWatchedList imageBaseURL={imageBaseURL} open={popupObj.openViewPopup} details={media} showType={media.type} onModalClose={() => setPopupObj({openViewPopup: false})}/>}
    {popupObj.openConfirmation && <ConfirmationModal 
        open={popupObj.openConfirmation} 
        onConfirmation={popupObj.onConfirmation}
        message={popupObj.message} icon={popupObj.icon}/>}
</div>)
}

export default MyWatchedListCard;