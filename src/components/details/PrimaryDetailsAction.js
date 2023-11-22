import { Bookmark, Favorite, PlayArrow, PlaylistAdd, Star } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

const PrimaryDetailsAction = ({details=null, ...props}) => {
    let rating = details.vote_average
    const getRatingRounded = () => {return Math.round(rating * 10) / 10}
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
                        value={getRatingRounded()*10} 
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
                            {rating ? getRatingRounded() : 'NR'}
                        </Typography>
                    </Box>
                </Box>
                <span style={{fontSize: '15px', color: 'white', fontWeight: 'bold', paddingLeft: '0.5rem'}}>User<br/>Score</span>
            </div>
            <Box className='primary-details-action-btn'><PlaylistAdd fontSize="10px"/></Box>
            <Box className='primary-details-action-btn'><Favorite fontSize="10px"/></Box>
            <Box className='primary-details-action-btn'><Bookmark fontSize="10px"/></Box>
            <Box className='primary-details-action-btn'><Star fontSize="10px"/></Box>
            <div style={{display: "flex", alignItems: 'center', color: 'white', gap: 5, cursor: 'pointer', fontWeight: '600'}}>
                <PlayArrow/> Play Trailer
            </div>
        </div>
    )
}

export default PrimaryDetailsAction;