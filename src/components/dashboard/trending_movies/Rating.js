import { Box, CircularProgress, Typography } from "@mui/material"

const Rating = ({rating=0, ...props}) => {
    const getRatingRounded = () => {return Math.round(rating * 10) / 10}
    return (
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
                size={33}
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
    )
}

export default Rating