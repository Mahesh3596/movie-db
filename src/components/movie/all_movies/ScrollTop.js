import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";


const ScrollTop = ({children, window}) => {
    const trigger = useScrollTrigger({
        target: window,
        disableHysterisis: true,
        threshold: 100
    })
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#movie-top-anchor')
        if (anchor) {
            anchor.scrollIntoView({block: 'center', behavior: 'smooth'})
        }
    }
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 50, right: 100}}
            >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp sx={{color: 'var(--app-color-primary)'}}/>
                </Fab>
            </Box>
        </Fade>
    )
}

export default ScrollTop;