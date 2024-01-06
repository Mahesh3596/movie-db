import { useEffect, useState } from "react";
import MyPageService from "services/MyPageService";
import MyFavouriteCard from "./MyFavouriteCard";

const MyFavouriteList = ({imageBaseURL='', showLoading=() => {}, showSnackbar=() => {}}) => {
    const [favouriteList, setFavouriteList] = useState([])

    useEffect(() => {
        getFavourites()
    }, [])
    const getFavourites = async () => {
        showLoading(true)
        const results = await MyPageService.getFavouriteList()
        setFavouriteList(results)
        showLoading(false)
    }
    const refreshCard = async () => { await getFavourites() }
    return (favouriteList.length > 0 && 
        <div style={{width: '100%', display: 'flex', gap: 10}}>
        {favouriteList.map((media) => 
            <MyFavouriteCard key={media.id} media={media} imageBaseURL={imageBaseURL} 
                showLoading={showLoading} showSnackbar={showSnackbar}
                refreshCard={refreshCard}/>)}
        </div>)
}

export default MyFavouriteList;