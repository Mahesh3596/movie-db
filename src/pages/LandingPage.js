import React, { useContext, useEffect, useState } from 'react';
import TrendingMovies from '../components/dashboard/trending_movies/TrendingMovies';
import UpcomingTrailers from '../components/dashboard/upcoming_trailers/UpcomingTrailers';
import Navbar from '../components/navbar/Navbar';
import { AppContext } from '../contexts/AppContext';

const LandingPage = (props) => {
    const {getTMDBConfigValue, showLoading} = useContext(AppContext)
    useEffect(() => {
      getConfigValues()  
    }, [])
    const getConfigValues = async () => {
        showLoading(true)
        await getTMDBConfigValue()
        showLoading(false)
    }
    return (
        <React.Fragment>
            <Navbar/>
            <div className='app-container'>
                <UpcomingTrailers/>
                <TrendingMovies/>
            </div>
        </React.Fragment>
    )
}

export default LandingPage