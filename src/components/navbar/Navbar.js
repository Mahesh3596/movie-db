import React, { useState } from 'react'
import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import AppLogo from 'assets/app-logo.png'
import NavMenu from './NavMenu';
import { useNavigate } from 'react-router-dom';
import SearchApp from './SearchApp';

const menuList = [
    {
        title: 'Movies',
        id: 'menu-movies',
        menus: [
            { title: 'Popular', path: '/movie-db/movie/popular' },
            { title: 'Now Playing', path: '/movie-db/movie/now_playing' },
            { title: 'Upcoming', path: '/movie-db/movie/upcoming' },
            { title: 'Top Rated', path: '/movie-db/movie/top_rated' }
        ]
    },
    {
        title: 'TV Shows',
        id: 'menu-tv-shows',
        menus: [
            { title: 'Popular', path: '/movie-db/tv/popular' },
            { title: 'Airing Today', path: '/movie-db/tv/airing_today' },
            { title: 'On The Air', path: '/movie-db/tv/on_the_air' },
            { title: 'Top Rated', path: '/movie-db/tv/top_rated' }
        ]
    },
    {
        title: 'People',
        id: 'menu-people',
        menus: [
            { title: 'Popular People' }
        ]
    }
]

const Navbar = (props) => {
    const navigate = useNavigate()
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const [menuObj, setMenuObj] = useState({})
    const onMenuHover = (e, menu) => {
        setMenuObj({...menu, open: true})
        setMenuAnchorEl(e.currentTarget)
    }
    const onMenuClose = () => {
        setMenuAnchorEl(null)
        setMenuObj({})
    }
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar elevation={0} sx={{background: 'var(--app-bar-primary)'}}>
                    <Toolbar style={{width: '80%', alignSelf: 'center', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto'}}>
                        <img
                            width="70px"
                            src={AppLogo}
                            style={{cursor: 'pointer'}}
                            onClick={() => navigate('/movie-db')}
                        />
                        <div>
                            <Typography 
                                sx={{display: 'flex', gap: '20px'}}
                                fontWeight="bold" padding="0 20px"
                                onMouseLeave={onMenuClose}>
                                {menuList.map(menu => (
                                    <span key={menu.id} id={menu.id} aria-describedby={menu.id}
                                        onMouseOver={(e) => onMenuHover(e, menu)}
                                        style={{cursor: 'pointer'}}>                                    
                                        {menu.title}
                                    </span>
                                ))}
                                {menuAnchorEl && <NavMenu anchorEl={menuAnchorEl} menuObj={menuObj} onMenuClose={onMenuClose}/>}
                            </Typography>
                        </div>
                        <div style={{justifySelf: 'end'}}>
                            <Typography fontWeight="bold" padding="0 20px" sx={{cursor: 'pointer'}}
                                onClick={() => navigate('/movie-db/mypage/my_watched_list')}
                            >My Page</Typography>
                        </div>
                        <SearchApp/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    )
}

function HideOnScroll({children}) {
    const trigger = useScrollTrigger({})
    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    )
}

export default Navbar