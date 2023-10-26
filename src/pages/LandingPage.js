import React, { useContext, useEffect, useState } from 'react';
import TrendingMovies from '../components/dashboard/trending_movies/TrendingMovies';
import Navbar from '../components/navbar/Navbar';
import { AppContext } from '../contexts/AppContext';

const LandingPage = (props) => {
    const {getTMDBConfigValue} = useContext(AppContext)
    useEffect(() => {
      getConfigValues()  
    }, [])
    const getConfigValues = async () => {
        await getTMDBConfigValue()
    }
    return (
        <React.Fragment>
            <Navbar/>
            <div className='app-container'>
                <TrendingMovies/>
            </div>
        </React.Fragment>
    )
}

export default LandingPage