import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const navigations = [
    {title: 'My Watched List', value: 'my_watched_list'},
    {title: 'My Watch List', value: 'my_watch_list'},
    {title: 'My Favourites', value: 'my_favourites'}
]

const MyPageNav = ({currentPage=''}) => {
    const navigate = useNavigate()

    const onItemClick = (page) => {
        navigate(`/movie-db/mypage/${page}`)
    }
    return (<div>
        <div className='my-page-nav'>
            <div style={{background: 'var(--app-color-primary)', padding: '10px', borderRadius: '10px 10px 0 0'}}>
                <Typography color='white' variant='button' fontWeight="bold">My Page</Typography>
            </div>
            <div style={{background: 'white', padding: '10px 0', borderRadius: ' 0 0 10px 10px', height: '165px'}}>
                {navigations.map(nav => <div key={nav.value} 
                    className={`nav-items ${nav.value === currentPage && 'active'}`}
                    onClick={() => onItemClick(nav.value)}>
                    <div>                        
                        <Typography sx={{alignSelf: 'center', fontSize: '15px', fontWeight: `${nav.value === currentPage ? 'bold' : ''}`}}>{nav.title}</Typography>
                    </div>
                </div>)}
            </div>
        </div>
    </div>)
}

export default MyPageNav;