import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from 'components/navbar/Navbar';
import { AppContext } from 'contexts/AppContext';
import Dashboard from './Dashboard';
import Movie from './Movie';
import Tv from './Tv';
import Footer from 'components/footer/Footer';
import DetailsPage from './DetailsPage';
import SearchResultPage from './SearchResultPage';
import MyPage from './MyPage';

const LandingPage = (props) => {
    const {getTMDBConfigValue, showLoading} = useContext(AppContext)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        getConfigValues()  
        if (location.pathname === '/') navigate('/movie-db')
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
                    <Route key="dashboard" exact path='/movie-db' element={<Dashboard/>}/>
                    <Route key="movie" exact path='/movie-db/movie/*' element={<Movie/>}/>
                    <Route key="tv" exact path='/movie-db/tv/*' element={<Tv/>}/>
                    <Route key="details_page" exact path='/movie-db/:type/details/:id' element={<DetailsPage/>}/>
                    <Route key="search" exact path='movie-db/search/:type' element={<SearchResultPage/>}/>
                    <Route key="my_page" exact path='movie-db/mypage/:page' element={<MyPage/>}/>
                </Routes>
            <Footer/>
            </div>
        </React.Fragment>
    )
}

export default LandingPage