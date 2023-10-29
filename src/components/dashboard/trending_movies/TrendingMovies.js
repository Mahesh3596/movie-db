import { useContext, useEffect, useState } from 'react';
import './TrendingMovies.css'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import TrendingMovieCard from './TrendingMovieCard';
import { getTrendingMovies } from 'services/TMDBMovies';
import { AppContext } from 'contexts/AppContext';

const TrendingMovies = (props) => {
    const {showLoading} = useContext(AppContext)
    const [trendingMovies, setTrendingMovies] = useState(null)
    const [movieFilter, setMovieFilter] = useState({type: 'day', language: 'en-US'})
    
    useEffect(() => {
        if (!trendingMovies) getMovieData()
    }, [])

    const getMovieData = async (filter={}) => {
        showLoading(true)
        setTrendingMovies(null)
        const res = await getTrendingMovies(filter)
        setTrendingMovies((prevState) => ({
            ...prevState,
            ...res
        }))
        showLoading(false)
    }
    const onTrendingMovieChange = async (event, typeValue) => {
        setMovieFilter(prevState => ({...prevState, type: typeValue}))
        await getMovieData({type: typeValue})
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
            {trendingMovies?.results.length > 0 && <div className='trending-movie-list-container'>
                {trendingMovies?.results?.map(movie => (
                    <TrendingMovieCard movie={movie} key={'tm'+movie?.id}/>
                ))}
            </div>}
        </div>
    )
}

export default TrendingMovies