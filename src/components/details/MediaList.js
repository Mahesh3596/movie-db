import { PlayArrow } from "@mui/icons-material";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TrailerPopup from "components/dashboard/upcoming_trailers/TrailerPopup";
import { useState } from "react";


const MostPopular = ({medias=[], imageBaseURL='', onItemClick=()=>{}}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.videos.length > 0 && <div style={{position: 'relative', width: "450px", height: '250px', cursor: 'pointer'}} onClick={() => onItemClick('video', medias.videos[0])}>
            <img loading="lazy" width="450px" height="100%" src={`https://img.youtube.com/vi/${medias.videos[0].key}/0.jpg`} style={{objectFit: 'none'}}/>
            <Box sx={{position: 'absolute', top: '42%', left: '43%', color: 'white'}}><PlayArrow sx={{fontSize: '50px', background: '#0000008f', borderRadius: '50px'}}/></Box>
        </div>}
        {medias?.backdrops && <img loading="lazy" height="100%" src={`${imageBaseURL}/w780${medias.backdrops[0].file_path}`} onClick={() => onItemClick('image', medias.backdrops[0])}/>}
        {medias?.posters && <img loading="lazy" height="100%" src={`${imageBaseURL}/w342${medias.posters[0].file_path}`} onClick={() => onItemClick('image', medias.posters[0])}/>}
    </div>)
}
const MediaVideos = ({medias=[], imageBaseURL='', onItemClick=()=>{}}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.videos && medias.videos.map(video => <div key={video.id} style={{position: 'relative', width: "450px", height: '250px', cursor: 'pointer'}} onClick={() => onItemClick('video', video)}>
            <img loading="lazy" width="450px" height="100%" src={`https://img.youtube.com/vi/${video.key}/0.jpg`} style={{objectFit: 'none'}}/>
            <Box sx={{position: 'absolute', top: '42%', left: '43%', color: 'white'}}><PlayArrow sx={{fontSize: '50px', background: '#0000008f', borderRadius: '50px'}}/></Box>
        </div>)}
    </div>)
}
const MediaBackdrops = ({medias=[], imageBaseURL='', onItemClick=()=>{}}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.backdrops && medias.backdrops.map(backdrop => <img loading="lazy" key={backdrop.file_path} height="100%" src={`${imageBaseURL}/w780${backdrop.file_path}`} onClick={() => onItemClick('image', backdrop)}/>)}
    </div>)
}
const MediaPosters = ({medias=[], imageBaseURL='', onItemClick=()=>{}}) => {
    return (<div style={{width: '100%', height: '250px', overflow: 'auto', whiteSpace: 'nowrap', borderRadius: '10px', paddingBottom: '10px', display: 'flex'}}>
        {medias?.posters && medias.posters.map(poster => <img loading="lazy" key={poster.file_path} height="100%" src={`${imageBaseURL}/w342${poster.file_path}`} onClick={() => onItemClick('image', poster)}/>)}
    </div>)
}

const tabList = [
    {label: "Most Popular", tabpanelComp: MostPopular},
    {label: "Videos", key: 'videos', tabpanelComp: MediaVideos},
    {label: "Backdrops", key: 'backdrops', tabpanelComp: MediaBackdrops},
    {label: "Posters", key: 'posters', tabpanelComp: MediaPosters}
]

const MediaList = ({details=null, imageBaseURL=''}) => {
    
    const [tabValue, setTabValue] = useState(0)
    const [mediaList, setMediaList] = useState({
        backdrops: details?.images?.backdrops || [],
        posters: details?.images?.posters || [],
        videos: details?.videos?.results || [],
    })
    const [trailerPopupObj, setTrailerPopupObj] = useState({open: false, trailerObj: {}})

    const onTabChange = (e, newValue) => {
        setTabValue(newValue)
    }
    const onHandlePopupClose = () => {
        setTrailerPopupObj(prevState => ({...prevState, open: false, trailerObj: {}}))
    }
    const showTrailerPopup = (mediaObj) => {
        if (trailerPopupObj.open == false) {
            setTrailerPopupObj(prevState => ({...prevState, open: true, trailerObj: mediaObj}))
        }
    }
    const openImageInNewTab = (mediaObj) => {
        window.open(`${imageBaseURL}/original${mediaObj.file_path}`, '_blank', 'noopener,noreferrer');
    }
    const onMediaClick = (type='image', mediaObj) => {
        if (type === 'video') showTrailerPopup(mediaObj)
        if (type === 'image') openImageInNewTab(mediaObj)
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
        {tabList.map((tab, idx) => <div key={`tabpanel-${idx}`} style={{paddingTop: '10px'}} className="media-tab-panel"
            role="tabpanel"
            hidden={tabValue !== idx}
            id={`media-tabpanel-${idx}`}
            aria-labelledby={`media-tab-${idx}`}
        >
            {mediaList && <tab.tabpanelComp medias={mediaList} imageBaseURL={imageBaseURL} onItemClick={onMediaClick}/>}
        </div>)}
        <hr style={{margin: '20px 0'}}/>
        <TrailerPopup showTrailer={trailerPopupObj.open} 
            trailerObj={trailerPopupObj.trailerObj} 
            handleClose={onHandlePopupClose}/>
    </div>)
}

export default MediaList;