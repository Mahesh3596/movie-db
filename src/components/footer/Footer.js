import './Footer.css'
import AppLogo from 'assets/app-logo.png'
import { Typography } from '@mui/material';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-img-section'>
                <img
                    src={AppLogo}
                />
            </div>
            <div className='footer-details-section'>
                <Typography fontWeight='bold' variant='body1' fontFamily='Monospace'>This is a Movie Database</Typography>
                <Typography variant='subtitle2' fontWeight='light' fontFamily='Monospace'>
                    you can find movies and series available <br/>Add them to your watchlist and rate them accordingly.
                </Typography>
                {/* <Typography fontWeight={700} variant='h7' fontFamily='Monospace'>Contact Us</Typography> */}
                {/* <div style={{display: 'flex', gap: '20px'}}>
                    <div style={{display: 'flex'}}>
                        <Typography fontWeight={700} variant='subtitle2' fontFamily='Monospace'>Phone no:&nbsp;</Typography>
                        <Typography variant='subtitle2' fontFamily='Monospace'>**********</Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography fontWeight={700} variant='subtitle2' fontFamily='Monospace'>Email:&nbsp;</Typography>
                        <Typography variant='subtitle2' fontFamily='Monospace'>**********</Typography>
                    </div>
                </div> */}
                <Typography variant='body2' sx={{textTransform: 'lowercase', fontWeight: 'light', fontSize: '12px'}}>
                    All Rights Reserved &reg;
                    Copyright &copy; 2023 By Movie DB
                </Typography>
            </div>
        </div>
    )
}

export default Footer;