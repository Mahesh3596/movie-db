import { useParams } from 'react-router-dom';
import '../components/mypage/MyPage.css'
import MyPageNav from "components/mypage/MyPageNav";
import MyWatchedList from 'components/mypage/MyWatchedList';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'contexts/AppContext';
import MyFavouriteList from 'components/mypage/MyFavouriteList';

const MyPage = ({}) => {
    const {tmdbConfig, showLoading, showSnackbar} = useContext(AppContext)
    const {page} = useParams()
    const [imageBaseURL, setImageBaseURL] = useState('')

    useEffect(() => {
        if (!imageBaseURL && tmdbConfig?.images?.secure_base_url) setImageBaseURL(tmdbConfig.images.secure_base_url)
    }, [tmdbConfig])

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', width: '80%', gap: 20, padding: '10px'}}>
            <MyPageNav currentPage={page}/>
            {imageBaseURL && page==="my_watched_list" && <MyWatchedList imageBaseURL={imageBaseURL} showLoading={showLoading} showSnackbar={showSnackbar}/>}
            {imageBaseURL && page==="my_favourites" && <MyFavouriteList imageBaseURL={imageBaseURL} showLoading={showLoading} showSnackbar={showSnackbar}/>}
        </div>
    </div>)
}

export default MyPage;