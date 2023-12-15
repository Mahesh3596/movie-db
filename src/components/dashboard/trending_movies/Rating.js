import { Box, CircularProgress, Typography } from "@mui/material"
import { getFormattedVoteCount, getRatingRounded } from "common/utils"

const Rating = ({rating=0, voteCount=0, ...props}) => {
    return (
        <div style={{zIndex: 1}}>
        <div style={{
            position: "absolute", width: '100px', height: '25px', 
            borderRadius: '20px', 
            top: -2, 
            right: -3, display: 'flex', justifyContent: 'start', alignItems: 'center',
            background: 'rgba(86, 119, 143, 0.65)'}}>
                <Typography variant="subtitle" component="div" color="white" sx={{fontSize: '10px', fontWeight: '600', paddingLeft: '10px'}}>
                    {voteCount ? getFormattedVoteCount(voteCount) : 'NR'}
                </Typography>
        </div>
        <Box
            sx={{
                display: 'flex',
                position: "absolute", 
                top: -2, 
                right: -3, 
                background: '#577790', 
                borderRadius: '50%', 
                padding: '2px'}}
        >
            <CircularProgress 
                {...props}
                variant="determinate" 
                value={getRatingRounded(rating)*10} 
                size={28}
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
                <Typography variant="subtitle" component="div" color="white" sx={{fontSize: '10px', fontWeight: '600'}}>
                    {rating ? getRatingRounded(rating) : 'NR'}
                </Typography>
            </Box>
        </Box>
        </div>
    )
}

export default Rating