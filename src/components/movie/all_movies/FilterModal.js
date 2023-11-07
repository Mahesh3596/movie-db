import { Autocomplete, Box, Button, Chip, Divider, Modal, Slider, Stack, TextField, Typography } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppContext } from "contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
    boxShadow: 24,
    p: 3,
}
const menuLabelStyle = { p: '0 0 0 1px', opacity: 0.75, color: 'var(--app-bar-primary)', fontSize: '15px' }

const FilterModal = ({open=false, existingFilter=null, existingSort=null, handleClose=()=>{}, onApply=()=>{}}) => {
    const initFilterObj = {ratingRange: [0, 10], genres: [], ratingVotes:0, language: null, from: null, to: null}

    const {tmdbConfig} = useContext(AppContext)
    const [genreList, setGenreList] = useState([])
    const [languageList, setLanguageList] = useState([])
    const [filterObj, setFilterObj] = useState(existingFilter || initFilterObj)

    useEffect(() => {
        if (tmdbConfig?.genres && genreList.length < 1) setGenreList(tmdbConfig.genres)
        if (tmdbConfig?.languages && languageList.length < 1) setLanguageList(tmdbConfig.languages)
    }, [tmdbConfig])

    const onUserRatingChange = (event, newValue) => { setFilterObj(prevState => ({...prevState, ratingRange: newValue})) }
    const onUserVotesChange = (event, newValue) => { setFilterObj(prevState => ({...prevState, ratingVotes: newValue})) }

    const onGenreSelect = (genre) => {
        let newGenres=filterObj.genres
        if (isGenreSelected(genre)) {
            let idxGenre = newGenres.findIndex(genreId => genreId === genre.id)
            newGenres.splice(idxGenre, 1)
        } else {
            newGenres.push(genre.id)
        }
        setFilterObj(prevState => ({...prevState, genres: newGenres}))
    }
    const isGenreSelected = (genre) => filterObj.genres.some(genreId => genreId === genre.id)
    const isGenreChanged = () => JSON.stringify(initFilterObj) === JSON.stringify(filterObj) || JSON.stringify(existingFilter) === JSON.stringify(filterObj)

    const onReleaseDateChange = (key, newValue) => { setFilterObj(prevState => ({...prevState, [key]: newValue ? dayjs(newValue).format('YYYY-MM-DD') : ''})) }
    
    const onModalClose = (event, reason) => {
        if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setFilterObj(existingFilter || initFilterObj)
            handleClose()
        }
    }
    return (
        <Modal
            open={open}
            onClose={onModalClose}
            disableAutoFocus
        >
            <Box sx={modalBoxStyle}>
                {genreList.length > 0 && <div>
                    <Typography alignSelf="start" sx={menuLabelStyle}>Genres</Typography>
                    <Stack direction="row" spacing={0} sx={{flexWrap: 'wrap'}}>
                        {genreList.map(genre => <Chip key={genre.id} label={genre.name} 
                            color="primary" variant={isGenreSelected(genre) ? "" : "outlined"} size="small" onClick={() => onGenreSelect(genre)}
                            sx={{margin: '2px', cursor: 'pointer'}}/>)}                    
                    </Stack>
                </div>}
                <Divider/>
                <div>
                    <Typography alignSelf="start" sx={menuLabelStyle}>Release Dates</Typography>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker label="from" slotProps={{ textField: { size: 'small' } }} format="DD MMM YYYY" 
                                    value={filterObj?.from ? dayjs(filterObj.from) : null}                            
                                    maxDate={dayjs(new Date())}
                                    onChange={(newValue) => onReleaseDateChange('from', newValue)}/>
                                <DatePicker label="to" slotProps={{ textField: { size: 'small' } }} format="DD MMM YYYY"
                                    value={filterObj?.to ? dayjs(filterObj.to) : null}
                                    minDate={dayjs(filterObj?.from || new Date()).add(1, 'day')}
                                    onChange={(newValue) => onReleaseDateChange('to', newValue)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <Divider/>
                <div>
                    <Typography alignSelf="start" sx={menuLabelStyle}>User Rating: {filterObj.ratingRange[0]+' to '+filterObj.ratingRange[1]}</Typography>
                    <Slider size="small"
                        value={filterObj.ratingRange}
                        step={1} min={0} max={10} marks={[...Array.from({length: 10}, (_, i) => ({label: i, value: i})), ...[{label: 10, value: 10}]]}
                        onChange={onUserRatingChange}/>
                </div>
                <Divider/>
                <div>
                    <Typography alignSelf="start" sx={menuLabelStyle}>User Votes: {'more than '+filterObj.ratingVotes}</Typography>
                    <Slider size="small"
                        value={filterObj.ratingVotes}
                        step={50} min={0} max={500} marks={[...Array.from({length: 10}, (_, i) => ({label: i*50, value: i*50})), ...[{label: 500, value: 500}]]}
                        onChange={onUserVotesChange}/>
                </div>
                <Divider/>
                <div>
                    <Autocomplete
                        options={languageList}
                        value={filterObj.language ? languageList.find(item => item.iso_639_1 === filterObj.language) : null}
                        size="small"
                        sx={{ width: 200 }}
                        getOptionLabel={(option) => option.english_name}
                        renderOption={(props, option) => <li {...props} key={option.english_name+option.iso_639_1}>{option.english_name}</li>}
                        renderInput={(params) => <TextField {...params} label="Select Language"/>}
                        onChange={(event, languageObj) => {
                            setFilterObj(prevState => ({...prevState, language: languageObj?.iso_639_1 || null}))
                        }}
                    />
                </div>
                <Divider/>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 10}}>
                    <Button variant="outlined" size="small" onClick={onModalClose}>Cancel</Button>
                    <Button variant="contained" size="small" 
                    onClick={() => onApply(filterObj, existingSort, false)} 
                    disabled={isGenreChanged()}>
                            Apply
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default FilterModal;