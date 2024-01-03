import { Star } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { getFormattedDate } from "common/utils";

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

const ModalViewWatchedList = ({open=false, details=null, onModalClose=()=>{}}) => {
    return (<Modal
        disableAutoFocus
        open={open}
        onClose={onModalClose}
    >
        <Box sx={modalBoxStyle}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="button" sx={{fontWeight: 'bold'}}>
                    {details?.title || details?.name}
                </Typography>
                {details?.my_rating && <Typography sx={{display: 'flex', justifyItems: 'center'}}>&nbsp;- {details?.my_rating}<Star sx={{fontSize: '15px', alignSelf: 'center'}}/></Typography>}
            </Box>
            <Box>
                <Typography sx={{fontSize: '15px'}}>Released On: </Typography>
                <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>{getFormattedDate(details?.release_date || details?.first_air_date, 'MMM DD, YYYY')}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: '15px'}}>Watched On: </Typography>
                <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>{getFormattedDate(details?.watched_on, 'MMM DD, YYYY')}</Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: '15px'}}>Watched At: </Typography>
                <Typography sx={{fontSize: '14px', fontStyle: 'italic'}}>{details?.watched_at || 'NA'}</Typography>
            </Box>
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
        </Box>
    </Modal>)
}

export default ModalViewWatchedList;