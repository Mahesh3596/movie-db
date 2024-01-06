import { useEffect, useState } from "react";
import MyPageService from "services/MyPageService";
import MyWatchedListCard from "./MyWatchedListCard";

const MyWatchedList = ({imageBaseURL='', showLoading=() => {}, showSnackbar=() => {}}) => {
    const [watchedList, setWatchedList] = useState([])

    useEffect(() => {
        getWatchedMovies()
    }, [])
    const getWatchedMovies = async () => {
        showLoading(true)
        const results = await MyPageService.getWatchedList()
        setWatchedList(results)
        showLoading(false)
    }
    const refreshCard = async () => { await getWatchedMovies() }
    return (watchedList.length > 0 && 
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}>
        {watchedList.map((media) => 
            <MyWatchedListCard key={media.id} media={media} imageBaseURL={imageBaseURL} 
                showLoading={showLoading} showSnackbar={showSnackbar}
                refreshCard={refreshCard}/>)}
        </div>)
}

export default MyWatchedList;