import React from 'react'
import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import AppLogo from 'assets/app-logo.png'

const Navbar = (props) => {
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar elevation={0} sx={{background: 'var(--app-bar-primary)'}}>
                    <Toolbar style={{width: '80%', alignSelf: 'center'}}>
                        <img
                            width="70px"
                            src={AppLogo}
                        />
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