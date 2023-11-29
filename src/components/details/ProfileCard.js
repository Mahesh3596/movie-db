import { Box, Card, Typography } from "@mui/material";
import imgPlaceholder from "../../assets/profile-ph.png"

const ProfileCard = ({info=null, imageBaseURL=''}) => {
    return (<Box boxShadow={3} borderRadius={2}>
        <Card sx={{height: '100%', borderRadius: 2}}>
            <div style={{width: 138, height: 175, overflow: 'hidden'}}>
                {info.profile_path ? <img
                    style={{width: '100%'}}
                    src={`${imageBaseURL}/w154${info.profile_path}`}
                />
                :
                <img
                    style={{width: '100%', height: '100%'}}
                    src={imgPlaceholder}
                />}
            </div>
            <div style={{padding: '10px'}}>
                <Typography fontSize="14px" fontWeight={700}>{info?.name || ''}</Typography>
                <Typography fontSize="14px">{info?.character || ''}</Typography>
            </div>
        </Card>
    </Box>)
}

export default ProfileCard;