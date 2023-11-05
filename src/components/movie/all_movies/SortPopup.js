import { Menu, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";

const menuItemStyle = {display: 'flex', flexDirection: 'column', '&:hover': {background: 'white'}, cursor: 'default'}
const menuLabelStyle = { p: '0 0 8px 1px', opacity: 0.75, color: 'var(--app-bar-primary)', fontSize: '15px' }

const sortList = [
    {label: 'Popularity Descending', value: 'popularity.desc'},
    {label: 'Popularity Ascending', value: 'popularity.asc'},
    {label: 'Rating Descending', value: 'vote_average.desc'},
    {label: 'Rating Ascending', value: 'vote_average.asc'},
    {label: 'Release Date Descending', value: 'primary_release_date.desc'},
    {label: 'Release Date Ascending', value: 'primary_release_date.asc'},
    {label: 'Title (A-Z)', value: 'title.asc'},
    {label: 'Title (Z-A)', value: 'title.desc'}
]

const SortPopup = ({anchorEl=null, existingSort=null, existingFilter=null,  open=false, handleClose=()=>{}, onApply=()=>{}}) => {
    const [sortValue, setSortValue] = useState(existingSort || 'popularity.desc')
    
    const handleSortvalueChange = (e) => {
        setSortValue(e.target.value)
        onApply(existingFilter, e.target.value, false)
    }
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'sort-menu',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            disableAutoFocusItem
        >
            <MenuItem disableRipple sx={menuItemStyle}>
                <Typography alignSelf="start" sx={menuLabelStyle}>Sort Results By</Typography>
                <Select
                    size="small"
                    sx={{ width: 250 }}
                    value={sortValue}
                    onChange={handleSortvalueChange}
                    displayEmpty
                >
                    {sortList.map(sort => <MenuItem key={sort.value} value={sort.value}>{sort.label}</MenuItem>)}
                </Select>
            </MenuItem>
        </Menu>
    )
}

export default SortPopup;