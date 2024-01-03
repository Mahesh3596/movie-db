import { useEffect, useState } from "react";
import MyPageService from "services/MyPageService";
import MyWatchedListCard from "./MyWatchedListCard";

const MyWatchedList = ({imageBaseURL=''}) => {
    const [watchedList, setWatchedList] = useState([])

    useEffect(() => {
        getWatchedMovies()
    }, [])
    const getWatchedMovies = async () => {
        const results = await MyPageService.getWatchedList()
        if (results.length > 0) setWatchedList(results)
    }
    return (watchedList.length > 0 && 
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}>
        {watchedList.map((media) => 
            <MyWatchedListCard key={media.id} media={media} imageBaseURL={imageBaseURL}/>)}
        </div>)
}

export default MyWatchedList;