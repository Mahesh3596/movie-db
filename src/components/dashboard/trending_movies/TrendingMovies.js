import { useState } from 'react';
import './TrendingMovies.css'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TrendingMovieCard from './TrendingMovieCard';

const TrendingMovies = ({trendingMovies=null, onChangeTrendingMovies=()=>{}}) => {
    const [movieFilter, setMovieFilter] = useState({type: 'day', language: 'en-US'})

    const onTrendingMovieChange = (event, typeValue) => {
        setMovieFilter(prevState => ({...prevState, type: typeValue}))
        onChangeTrendingMovies({type: typeValue})
    }
    return (
        <div className='trending-movies'>
            <div style={{width: '80%', display: 'flex', marginBottom: '10px'}}>
                <Typography sx={{textAlign: 'left', fontWeight: 'bold', color: 'var(--app-color-primary)', alignSelf: 'center'}} variant='h6'>Trending Movies</Typography>
                <ToggleButtonGroup 
                    size="small"
                    value={movieFilter.type} 
                    exclusive
                    onChange={onTrendingMovieChange}
                >
                    <ToggleButton value='day'>Today</ToggleButton>
                    <ToggleButton value='week'>This Week</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="trending-movie-list-container">
                <div className='trending-movie-list'>
                    {trendingMovies?.results.length > 0 && trendingMovies?.results?.map(movie => (
                        <TrendingMovieCard movie={movie} key={'tm'+movie?.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrendingMovies