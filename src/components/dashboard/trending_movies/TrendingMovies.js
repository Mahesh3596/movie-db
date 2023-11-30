import { useState } from 'react';
import './TrendingMovies.css'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TrendingMovieCard from './TrendingMovieCard';

const TrendingMovies = ({trendingMovies=null, onChangeTrendingMovies=()=>{}, showType='movie'}) => {
    const [movieFilter, setMovieFilter] = useState({type: 'day', language: 'en-US'})

    const onTrendingMovieChange = (event, typeValue) => {
        if(typeValue) {
            setMovieFilter(prevState => ({...prevState, type: typeValue}))
            onChangeTrendingMovies({type: typeValue})
        }
    }
    return (
        <div className='trending-movies'>
            <div style={{width: '80%', display: 'flex', marginBottom: '10px'}}>
                <Typography sx={{textAlign: 'left', fontWeight: 'bold', color: 'var(--app-color-primary)', alignSelf: 'center'}} variant='h6'>
                    Trending {showType=='tv' ? 'TV Shows' : 'Movies'}
                </Typography>
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
                        <TrendingMovieCard movie={movie} key={'tm'+movie?.id} showType={showType}/>
                    ))}
                    {trendingMovies?.results.length <= 0 && Array.from({length: 10}, (_,i)=> ({})).map((movie,idx) => (
                        <TrendingMovieCard movie={movie} key={'tm'+movie?.id+idx} showType={showType}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrendingMovies