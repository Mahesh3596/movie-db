import React, { useContext, useEffect, useState } from 'react';
import TrendingMovies from 'components/dashboard/trending_movies/TrendingMovies';
import UpcomingTrailers from 'components/dashboard/upcoming_trailers/UpcomingTrailers';
import { AppContext } from 'contexts/AppContext';
import { getTrendingMovies, getUpcomingMovies } from 'services/TMDBMovies';
const Dashboard = () => {
    const {showLoading} = useContext(AppContext)
    const [upComingMovies, setUpcomingMovies] = useState(null)
    const [trendingMovies, setTrendingMovies] = useState(null)
    useEffect(() => {
        if(!trendingMovies && !upComingMovies) getDashboardMovieData()
    }, [])
    const getDashboardMovieData = async () => {
        showLoading(true)
        await getMovieDatas('trending_movies')
        await getMovieDatas('upcoming_movies')
        showLoading(false)
    }
    const getMovieDatas = async (section='', filter={}) => {
        let res;
        switch (section) {
            case 'trending_movies':
                setTrendingMovies(null)
                res = await getTrendingMovies(filter)
                setTrendingMovies((prevState) => ({
                    ...prevState,
                    ...res
                }))
                break;
            case 'upcoming_movies':
                setUpcomingMovies(null)
                res = await getUpcomingMovies(filter)
                setUpcomingMovies((prevState) => ({
                    ...prevState,
                    ...res
                }))
                break;
        
            default:
                res = {}
                break;
        }
    }
    return (
        <>
            <UpcomingTrailers upComingMovies={upComingMovies} onChangeUpcomingMovies={(filter={}) => getMovieDatas('upcoming_movies', filter)}/>
            <TrendingMovies trendingMovies={trendingMovies} onChangeTrendingMovies={(filter={}) => getMovieDatas('trending_movies', filter)}/>
        </>
    )
}

export default Dashboard;