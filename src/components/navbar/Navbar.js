import React from 'react'
import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';

const Navbar = (props) => {
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar elevation={0} sx={{background: '#1A4568'}}>
                    <Toolbar>
                        <Typography variant='h6' component='div'>
                            Movie DB
                        </Typography>
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