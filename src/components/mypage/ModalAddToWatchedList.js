import { AppContext } from "contexts/AppContext"
import moment from "moment"
import { useContext, useState } from "react"
import MyPageService from "services/MyPageService"

const { Modal, Box, TextField, Rating, Typography, Button } = require("@mui/material")

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

const ModalAddToWatchedList = ({open=false, details=null, showType='', onModalClose=()=>{}}) => {
    const {showLoading, showSnackbar} = useContext(AppContext)
    const [dataObj, setDataObj] = useState({})
    const [dispRating, setDispRating] = useState(-1)

    const onValueChange = (key, value) => {
        setDataObj(prevState => ({
            ...prevState,
            [key]: value
        }))
    }
    const isDataValid = () => {
        if (!details) throw 'Movie details is missing!'
        if (!dataObj?.watched_on || 
            !dataObj?.keywords || 
            dataObj?.my_rating < 0 || 
            !dataObj?.my_comments) throw 'All fields are required!'
        return true
    }
    const onCancel = () => { setDataObj({}); onModalClose(); }
    const onSubmit = async () => {
        try {
            if (isDataValid()) {
                showLoading(true)
                const req = {
                    ...dataObj,
                    type: showType,
                    id: details.id,
                    backdrop_path: details.backdrop_path,
                    budget: details.budget,
                    original_language: details.original_language,
                    original_title: details.original_title,
                    overview: details.overview,
                    poster_path: details.poster_path,
                    release_date: details.release_date,
                    revenue: details.revenue,
                    runtime: details.runtime,
                    tagline: details.tagline, title: details.title, status: details.status,
                    vote_average: details.vote_average, vote_count: details.vote_count,
                    created_on: moment.utc().format(),
                    updated_on: moment.utc().format()
                }
                const res = await MyPageService.upsertToWatchedList(req)
                if (res.id) {onCancel(); showSnackbar({show: true, message: 'Added to watched list!', type: 'success'});}
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
            <TextField size="small" placeholder="You watched this movie on?" 
                value={dataObj?.watched_on || ''}
                onInput={(e) => onValueChange('watched_on', e.target.value)}/>
            <TextField size="small" placeholder="Add some keywords for the movie! (Comma Seperated)" 
                value={dataObj?.keywords || ''}
                onInput={(e) => onValueChange('keywords', e.target.value)}/>
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