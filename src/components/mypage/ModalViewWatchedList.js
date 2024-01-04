import { RemoveRedEye, Star } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { getFormattedDate } from "common/utils";
import { useNavigate } from "react-router-dom";

const modalBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    // boxShadow: 24,
    p: 3,
    color: 'var(--app-color-primary)',
}

const ModalViewWatchedList = ({imageBaseURL='', open=false, details=null, onModalClose=()=>{}}) => {
    const navigate = useNavigate()

    return (<Modal
        disableAutoFocus
        open={open}
        onClose={onModalClose}
    >
        <Box sx={{...modalBoxStyle, 
            backgroundImage: `url(${imageBaseURL}w1280_and_h720_multi_faces${details.backdrop_path})`, 
            backgroundSize: 'cover', boxShadow: "inset 0 0 0 2000px rgba(255, 255, 255, 0.8)"}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="button" sx={{fontWeight: 'bold'}}>
                    {details?.title || details?.name}
                </Typography>
                {details?.my_rating && <Typography sx={{display: 'flex', justifyItems: 'center'}}>&nbsp;- {details?.my_rating}<Star sx={{fontSize: '15px', alignSelf: 'center'}}/></Typography>}
            </Box>
            <div style={{display: "grid", gridTemplateColumns: 'auto 1fr', alignItems: 'center'}}>
                <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                    <Box>
                        <Typography sx={{fontSize: '15px'}}>Released On: </Typography>
                        <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>{getFormattedDate(details?.release_date || details?.first_air_date, 'MMM DD, YYYY')}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{fontSize: '15px'}}>Watched On: </Typography>
                        <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>{getFormattedDate(details?.watched_on, 'MMM DD, YYYY')}</Typography>
                    </Box>
                    <Box className="txt-ellipsis-2">
                        <Typography sx={{fontSize: '15px'}}>Watched At: </Typography>
                        <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>{details?.watched_at || 'NA'}</Typography>
                    </Box>
                </div>
                <div style={{display: 'grid'}}>
                    <img
                        style={{width: '90px', borderRadius: 10, justifySelf: 'flex-end'}}
                        src={`${imageBaseURL}w220_and_h330_face${details.poster_path}`}
                    />
                </div>
            </div>
            <Box>
                <Typography sx={{fontSize: '15px'}}>Keywords: </Typography>
                <Typography sx={{fontSize: '14px', fontStyle: 'italic'}} className="txt-ellipsis-1">{details?.my_keywords || 'NA'}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: '15px'}}>My Comments: </Typography>
                <Typography sx={{fontSize: '14px', fontStyle: 'italic'}} className="txt-ellipsis-2">{details?.my_comments || 'NA'}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: '15px'}}>Overview: </Typography>
                <Typography sx={{fontSize: '14px', fontStyle: 'italic'}} className="txt-ellipsis-3">{details?.overview || 'NA'}</Typography>
            </Box>
            <Button endIcon={<RemoveRedEye />} variant="outlined" onClick={() => navigate(`/movie-db/${details.type}/details/${details.id}`)}>View</Button>
        </Box>
    </Modal>)
}

export default ModalViewWatchedList;