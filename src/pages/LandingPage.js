import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from 'components/navbar/Navbar';
import { AppContext } from 'contexts/AppContext';
import Dashboard from './Dashboard';

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
                <Routes>
                    <Route key="dashboard" exact path='/' element={<Dashboard/>}/>
                </Routes>
            </div>
        </React.Fragment>
    )
}

export default LandingPage