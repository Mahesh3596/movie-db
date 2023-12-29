import { Alert, Slide, Snackbar } from "@mui/material";

const TransitionDown = (props) => {
    return <Slide {...props} direction="down"/>
}
const SnackbarComp = ({open=false, message='', variant='', onClose=()=>{}}) => {
    return (<Snackbar open={open} autoHideDuration={2000} onClose={onClose} 
        TransitionComponent={TransitionDown} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={onClose} severity={variant} sx={{width: '100%'}} elevation={6} variant="filled">
            {message}
        </Alert>
    </Snackbar>)
}

export default SnackbarComp;