import { Box, CircularProgress, Typography } from "@mui/material"

const Rating = ({rating=0, voteCount=0, ...props}) => {
    const getRatingRounded = () => {return Math.round(rating * 10) / 10}
    const getFormattedVoteCount = () => {
        let formatted = ''
        if (voteCount >= 100000 && voteCount < 10000000) 
            formatted = parseFloat(voteCount/1000000).toPrecision(2)+'m'
        else if (voteCount >= 1000 && voteCount < 100000) 
            formatted = parseFloat(voteCount/1000).toPrecision(2)+'k'
        else if (voteCount < 1000) 
            formatted = voteCount
        else
            formatted = voteCount
        return formatted + ' votes'
    }
    return (
        <div style={{zIndex: 1}}>
        <div style={{
            position: "absolute", width: '100px', height: '25px', 
            borderRadius: '20px', 
            top: -2, 
            right: -3, display: 'flex', justifyContent: 'start', alignItems: 'center',
            background: 'rgba(86, 119, 143, 0.65)'}}>
                <Typography variant="subtitle" component="div" color="white" sx={{fontSize: '10px', fontWeight: '600', paddingLeft: '10px'}}>
                    {voteCount ? getFormattedVoteCount() : 'NR'}
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
                value={getRatingRounded()*10} 
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
                    {rating ? getRatingRounded() : 'NR'}
                </Typography>
            </Box>
        </Box>
        </div>
    )
}

export default Rating