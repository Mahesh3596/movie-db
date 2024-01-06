import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { AppContext } from "contexts/AppContext"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import MyPageService from "services/MyPageService"
import dayjs from "dayjs";
import { Modal, Box, TextField, Rating, Typography, Button } from "@mui/material"
import { buildRequestBody } from "./myPageUtils"

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
}

const ModalAddToWatchedList = ({mode='create', open=false, details=null, showType='', onModalClose=()=>{}, refresh=null}) => {
    const {showLoading, showSnackbar} = useContext(AppContext)
    const [dataObj, setDataObj] = useState({})
    const [dispRating, setDispRating] = useState(-1)

    useEffect(() => {
        if (mode==='edit' && details) {
            setDataObj({
                watched_at: details?.watched_at || '',
                watched_on: details?.watched_on || null,
                my_keywords: details?.my_keywords || '',
                my_rating: details?.my_rating || -1,
                my_comments: details?.my_comments || '',
            })
        }
    }, [details])
    const onValueChange = (key, value) => {
        setDataObj(prevState => ({
            ...prevState,
            [key]: value
        }))
    }
    const isDataValid = () => {
        if (!details) throw 'Movie details is missing!'
        if (!dataObj?.watched_at || 
            !dataObj?.watched_on || 
            !dataObj?.my_keywords || 
            dataObj?.my_rating < 0 || 
            !dataObj?.my_comments) throw 'All fields are required!'
        return true
    }
    const onCancel = () => { setDataObj({}); onModalClose(); }
    const onSubmit = async () => {
        try {
            if (isDataValid()) {
                showLoading(true)
                const detailsReq = buildRequestBody(details, mode==='edit')
                const req = {
                    ...dataObj,
                    ...detailsReq,
                    type: showType,
                    is_watched_list: true
                }
                const res = await MyPageService.upsertToMyList(req)
                if (res.id) {
                    onCancel(); showSnackbar({show: true, message: mode === 'edit' ? 'Watched list updated!' : 'Added to watched list!', type: 'success'}); 
                    if (mode==='edit' || refresh) refresh();
                }
                showLoading(false)
            }
        } catch (err) {
            console.error('Add to watched list err >> ', err)
            showSnackbar({show: true, message: err?.message || err, type: 'error'})
        }
    }

    return (<Modal
    disableAutoFocus
    open={open}
    onClose={onModalClose}>
        <Box sx={modalBoxStyle}>
            <Typography variant="button" sx={{alignSelf: 'center', fontWeight: 'bold', color: 'var(--app-color-primary)'}}>Add To Watched List</Typography>
            <TextField size="small" placeholder="Where are you watched this movie?" 
                value={dataObj?.watched_at || ''}
                onInput={(e) => onValueChange('watched_at', e.target.value)}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker size="small" label="When did you watched this movie?" 
                    format='DD/MM/YYYY'
                    value={dataObj?.watched_on ? dayjs(dataObj?.watched_on) : null}
                    onChange={(newValue) => onValueChange('watched_on', newValue ? dayjs(newValue).format() : null)}/>
            </LocalizationProvider>
            <TextField size="small" placeholder="Add some keywords for the movie! (Comma Seperated)" 
                value={dataObj?.my_keywords || ''}
                onInput={(e) => onValueChange('my_keywords', e.target.value)}/>
            <div>
                <Typography component="legend">What is your Rating?</Typography>
                <div style={{display: 'flex'}}>
                    <Rating precision={0.1} max={10} size="large"
                        value={dataObj?.my_rating || 0}
                        onChange={(e, newValue) => onValueChange('my_rating', newValue)}
                        onChangeActive={(e, newHover) => setDispRating(newHover)}/>
                    {(dispRating > -1 || dataObj?.my_rating > -1) && 
                    <Typography component="legend" sx={{alignSelf: 'center', paddingLeft: '1rem'}} variant="h6">
                        {dispRating > -1 ? dispRating : dataObj?.my_rating}
                    </Typography>}
                </div>
            </div>
            <TextField size="small" multiline placeholder="Why did you rate so? explain yourself..." rows={4} 
                value={dataObj?.my_comments || ''}
                onInput={(e) => onValueChange('my_comments', e.target.value)}/>
            <div style={{alignSelf: 'flex-end'}}>
                <Button onClick={onCancel}>Cancel</Button>
                <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </div>
        </Box>
    </Modal>)
}

export default ModalAddToWatchedList;