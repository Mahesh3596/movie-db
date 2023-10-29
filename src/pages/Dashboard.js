import React from 'react';
import TrendingMovies from 'components/dashboard/trending_movies/TrendingMovies';
import UpcomingTrailers from 'components/dashboard/upcoming_trailers/UpcomingTrailers';
const Dashboard = () => {
    return (
        <>
            <UpcomingTrailers/>
            <TrendingMovies/>
        </>
    )
}

export default Dashboard;