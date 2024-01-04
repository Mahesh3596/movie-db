import { Box, Button, Modal, Typography } from "@mui/material";

const modalBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 200,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    // boxShadow: 24,
    p: 3,
    color: 'var(--app-color-primary)',
    alignItems: 'center',
}

const ConfirmationModal = ({open=false, onConfirmation=()=>{}, message='', icon=null}) => {
    return (<Modal
        disableAutoFocus
        open={open}
        onClose={onConfirmation}
    >
        <Box sx={modalBoxStyle}>
            {icon}
            <Typography fontWeight="bold">{message}</Typography>
            <div style={{display: 'flex', gap: 10}}>
                <Button variant="contained" size='small'
                onClick={() => onConfirmation(true)}>Yes</Button>
                <Button variant="outlined" size='small'
                onClick={() => onConfirmation(false)}>No</Button>  
            </div>       
        </Box>
    </Modal>)
}

export default ConfirmationModal;