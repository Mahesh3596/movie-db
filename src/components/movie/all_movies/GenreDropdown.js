import { Box, Chip, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material"
import { AppContext } from "contexts/AppContext"
import { useContext, useEffect, useState } from "react"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const GenreDropdown = () => {
    const {tmdbConfig} = useContext(AppContext)
    const theme = useTheme()
    const [genreList, setGenreList] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    useEffect(() => {
        if (tmdbConfig?.genres && genreList.length < 1) setGenreList(tmdbConfig.genres)
    }, [tmdbConfig])
    const onSelectChange = (e) => {
        setSelectedGenres(e.target.value)
    }
    return (
        <div>
            {genreList.length > 0 && <FormControl sx={{ m: 1, width: 250, background: 'var(--app-color-secondary)', borderRadius: '5px' }}>
                {/* <Typography sx={{fontWeight: '600',color: 'var(--app-color-primary)'}}>Genre:</Typography> */}
                <InputLabel  id="genre-label" shrink={false}>{selectedGenres.length < 1 ? '-Choose Genres-' : ''}</InputLabel>
                <Select
                    labelId="genre-label"
                    id="genre-list"
                    multiple
                    value={selectedGenres}
                    onChange={onSelectChange}
                    renderValue={selected => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', maxHeight: 30, overflow: 'auto', gap: 0.2}}>
                            {selected.map(genre => <Chip key={genre.id} label={genre.name} sx={{padding: 0}}/>)}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {genreList.map(genre => <MenuItem key={genre.id} value={genre} style={getStyles(genre.name, selectedGenres, theme)}>
                        {genre.name}
                    </MenuItem>)}
                </Select>
            </FormControl>}
        </div>
    )
}

export default GenreDropdown