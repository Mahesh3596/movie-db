import { Chip, Typography } from '@mui/material';
import './Search.css'
import { useNavigate } from 'react-router-dom';

const SearchCount = ({searchResults=null, type='movie', searchVal=''}) => {
    const navigate = useNavigate()
    const onItemClick = (itemType) => {
        navigate(`/movie-db/search/${itemType}?query=${searchVal}`)
    }
    return (<div>
        <div className='search-count'>
            <div style={{background: 'var(--app-color-primary)', padding: '10px', borderRadius: '10px 10px 0 0'}}>
                <Typography color='white' variant='button' fontWeight="bold">Search Results</Typography>
            </div>
            <div style={{background: 'white', padding: '10px 0', borderRadius: ' 0 0 10px 10px', height: '165px'}}>
                {searchResults && Object.keys(searchResults).map(key => <div key={key} 
                    className={`search-count-items ${searchResults[key]?.type === type && 'active'}`}
                    onClick={() => onItemClick(searchResults[key]?.type)}>
                    <div>                        
                        <Typography sx={{alignSelf: 'center', fontSize: '15px', fontWeight: `${searchResults[key]?.type === type ? 'bold' : ''}`}}>{key}</Typography>
                        <Chip size='small' sx={{justifySelf: 'flex-end', fontSize: '12px'}} label={searchResults[key]?.total_results || 0}/>
                    </div>
                </div>)}
            </div>
        </div>
    </div>)
}

export default SearchCount;