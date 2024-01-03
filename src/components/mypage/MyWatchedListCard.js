import { Delete, Edit, Favorite, FavoriteBorder, RemoveRedEye, Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getFormattedDate } from "common/utils";

const MyWatchedListCard = ({media=null, imageBaseURL=''}) => {

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
            <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>Released On :&nbsp;</Typography>
            <Typography sx={{fontSize: '14px'}}>{getFormattedDate(media?.release_date || media?.first_air_date, 'MMM DD, YYYY')}</Typography>
        </Box>
        <Box sx={{display: 'grid', marginTop: '5px', gridTemplateColumns: 'auto auto 1fr'}}>
            <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>Watched On :&nbsp;</Typography>
            <Typography sx={{fontSize: '14px'}} className="txt-ellipsis-1">{media?.watched_on || 'NA'}</Typography>
            <Box sx={{justifySelf: 'flex-end', paddingRight: '10px', display: 'flex', gap:1}}>
                <RemoveRedEye fontSize="small"/>
                <FavoriteBorder fontSize="small"/>
                <Edit fontSize="small"/>
                <Delete fontSize="small"/>
            </Box>
        </Box>
    </Box>
</div>)
}

export default MyWatchedListCard;