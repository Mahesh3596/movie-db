import { PlayArrow } from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TMDBMovies from "services/TMDBMovies";


const MostPopular = ({medias=[], imageBaseURL=''}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.videos.length > 0 && <div style={{position: 'relative', width: "450px", height: '250px'}}>
            <img width="450px" height="100%" src={`https://img.youtube.com/vi/${medias.videos[0].key}/0.jpg`} style={{objectFit: 'none'}}/>
            <Box sx={{position: 'absolute', top: '42%', left: '43%', color: 'white'}}><PlayArrow sx={{fontSize: '50px', background: '#0000008f', borderRadius: '50px'}}/></Box>
        </div>}
        {medias?.backdrops && <img height="100%" src={`${imageBaseURL}/w780${medias.backdrops[0].file_path}`}/>}
        {medias?.posters && <img height="100%" src={`${imageBaseURL}/w342${medias.posters[0].file_path}`}/>}
    </div>)
}
const MediaVideos = ({medias=[], imageBaseURL=''}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.videos && medias.videos.map(video => <div key={video.id} style={{position: 'relative', width: "450px", height: '250px'}}>
            <img width="450px" height="100%" src={`https://img.youtube.com/vi/${video.key}/0.jpg`} style={{objectFit: 'none'}}/>
            <Box sx={{position: 'absolute', top: '42%', left: '43%', color: 'white'}}><PlayArrow sx={{fontSize: '50px', background: '#0000008f', borderRadius: '50px'}}/></Box>
        </div>)}
    </div>)
}
const MediaBackdrops = ({medias=[], imageBaseURL=''}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.backdrops && medias.backdrops.map(backdrop => <img key={backdrop.file_path} height="100%" src={`${imageBaseURL}/w780${backdrop.file_path}`}/>)}
    </div>)
}
const MediaPosters = ({medias=[], imageBaseURL=''}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.posters && medias.posters.map(poster => <img key={poster.file_path} height="100%" src={`${imageBaseURL}/w342${poster.file_path}`}/>)}
    </div>)
}

const tabList = [
    {label: "Most Popular", tabpanelComp: MostPopular},
    {label: "Videos", key: 'videos', tabpanelComp: MediaVideos},
    {label: "Backdrops", key: 'backdrops', tabpanelComp: MediaBackdrops},
    {label: "Posters", key: 'posters', tabpanelComp: MediaPosters}
]

const MediaList = ({details=null, imageBaseURL=''}) => {

    const {showLoading} = useContext(AppContext)
    const {type, id} = useParams()
    
    const [tabValue, setTabValue] = useState(0)
    const [mediaList, setMediaList] = useState(null)

    useEffect(() => {
        getAllMedia()
    }, [id])

    const getAllMedia = async () => {
        showLoading(true)
        let urlVideosEndpoint = type === 'tv' ? `/tv/${id}/videos` : `/movie/${id}/videos`
        let urlImagesEndpoint = type === 'tv' ? `/tv/${id}/images` : `/movie/${id}/images`
        const videosRes = await TMDBMovies.getDetails(urlVideosEndpoint)
        const imagesRes = await TMDBMovies.getDetails(urlImagesEndpoint)
        setMediaList(prevState => ({
            backdrops: imagesRes?.backdrops || [],
            posters: imagesRes?.posters || [],
            videos: videosRes?.results || [],
        }))
        showLoading(false)
    }
        

    const onTabChange = (e, newValue) => {
        setTabValue(newValue)
    }
    
    return (<div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6" fontWeight='bold' sx={{paddingRight: '20px'}}>Media</Typography>
            <Tabs value={tabValue} onChange={onTabChange}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: 'black', height: '3px'
                    }
                }}
            >
                {tabList.map((tab, idx) => <Tab key={`tab-${idx}`} disableRipple 
                    label={tab.key ? `${tab.label} ${mediaList?.[tab.key]?.length}` : tab.label} 
                    id={`media-tab-${idx}`} aria-controls={`media-tabpanel-${idx}`}/>)}
            </Tabs>
        </div>
        {tabList.map((tab, idx) => <div key={`tabpanel-${idx}`} style={{paddingTop: '10px'}}
            role="tabpanel"
            hidden={tabValue !== idx}
            id={`media-tabpanel-${idx}`}
            aria-labelledby={`media-tab-${idx}`}
        >
            {mediaList && <tab.tabpanelComp medias={mediaList} imageBaseURL={imageBaseURL}/>}
        </div>)}
    </div>)
}

export default MediaList;