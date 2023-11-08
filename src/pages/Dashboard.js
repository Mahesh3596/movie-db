import React, { useContext, useEffect, useState } from 'react';
import TrendingMovies from 'components/dashboard/trending_movies/TrendingMovies';
import UpcomingTrailers from 'components/dashboard/upcoming_trailers/UpcomingTrailers';
import { AppContext } from 'contexts/AppContext';
import TMDBMovies from 'services/TMDBMovies';
const Dashboard = () => {
    const {showLoading} = useContext(AppContext)
    const [upComingMovies, setUpcomingMovies] = useState(null)
    const [trendingMovies, setTrendingMovies] = useState(null)
    const [trendingTVShows, setTrendingTVShows] = useState(null)
    useEffect(() => {
        if(!trendingMovies && !upComingMovies) getDashboardMovieData()
    }, [])
    const getDashboardMovieData = async () => {
        showLoading(true)
        await getMovieDatas('trending_movies')
        await getMovieDatas('upcoming_movies')
        await getMovieDatas('trending_tv_shows')
        showLoading(false)
    }
    const getMovieDatas = async (section='', filter={}) => {
        let res;
        switch (section) {
            case 'trending_movies':
                setTrendingMovies(null)
                res = await TMDBMovies.getTrendingMovies(filter)
                setTrendingMovies((prevState) => ({
                    ...prevState,
                    ...res
                }))
                break;
            case 'upcoming_movies':
                setUpcomingMovies(null)
                res = await TMDBMovies.getUpcomingMovies(filter)
                setUpcomingMovies((prevState) => ({
                    ...prevState,
                    ...res
                }))
                break;
            case 'trending_tv_shows':
                setTrendingTVShows(null)
                res = await TMDBMovies.getTrendingMovies({...filter, showType: 'tv'})
                setTrendingTVShows((prevState) => ({
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
            <TrendingMovies trendingMovies={trendingMovies} onChangeTrendingMovies={(filter={}) => getMovieDatas('trending_movies', filter)} showType='movie'/>
            <UpcomingTrailers upComingMovies={upComingMovies} onChangeUpcomingMovies={(filter={}) => getMovieDatas('upcoming_movies', filter)}/>
            <br/>
            <TrendingMovies trendingMovies={trendingTVShows} onChangeTrendingMovies={(filter={}) => getMovieDatas('trending_tv_shows', filter)} showType='tv'/>
        </>
    )
}

export default Dashboard;