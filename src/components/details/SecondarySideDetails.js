import { Facebook, Instagram, Link, Twitter, YouTube } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { useContext } from "react";

const SecondarySideDetails = ({details=null, imageBaseURL='', showType=''}) => {
    const {tmdbConfig} = useContext(AppContext)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    const getLanguage = (language='') => {
        let orgLang=null;
        if (language && tmdbConfig?.languages.length > 0) {
            orgLang = tmdbConfig.languages.filter(lang => lang.iso_639_1 === language)
        }
        return orgLang?.length > 0 ? orgLang[0].name : '-'
    }
    return (<>
        <div style={{display: 'flex', gap: 10, padding: '20px 20px 0 20px', opacity: 0.7}}>
            <Facebook sx={{fontSize: '30px'}}/>
            <Twitter sx={{fontSize: '30px'}}/>
            <Instagram sx={{fontSize: '30px'}}/>
            <div style={{width: '1px', height: '30px', background: 'black', opacity: 0.4}}/>
            <YouTube sx={{fontSize: '30px'}}/>
            <div style={{width: '1px', height: '30px', background: 'black', opacity: 0.4}}/>
            <Link sx={{fontSize: '30px'}}/>
        </div>
        <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Status</Typography>
            <Typography sx={{fontSize: '14px'}}>{details?.status || '-'}</Typography>
        </div>
        <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Original Language</Typography>
            <Typography sx={{fontSize: '14px'}}>{getLanguage(details?.original_language)}</Typography>
        </div>
        {showType === 'movie' ? <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Budget</Typography>
            <Typography sx={{fontSize: '14px'}}>{details?.budget ? formatter.format(details.budget) : '-'}</Typography>
        </div>
        :
        <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Network</Typography>
            {details?.networks.length > 0 ? details.networks.map(network => <img width="50px" key={network.id} src={`${imageBaseURL}/w92${network.logo_path}`}/>) : '-'}
        </div>}
        {showType === 'movie' ? <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Revenue</Typography>
            <Typography sx={{fontSize: '14px'}}>{details?.revenue ? formatter.format(details.revenue) : '-'}</Typography>
        </div>
        :
        <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Type</Typography>
            <Typography sx={{fontSize: '14px'}}>{details?.type || '-'}</Typography>
        </div>}
        <div style={{padding: '20px 20px 0 20px'}}>
            <Typography sx={{fontSize: '16px'}} fontWeight='bold'>Keywords</Typography>
            <Stack direction="row" spacing={0} sx={{flexWrap: 'wrap', paddingTop: '5px'}}>
                {details?.keywords.map(kw => <Chip key={kw.id} label={kw.name} size="small"
                    sx={{margin: '2px', cursor: 'pointer', color: 'white', background: '#386f9a'}}/>)}
            </Stack>
        </div>
        <hr style={{margin: '20px 20px 0 20px'}}/>
    </>)
}

export default SecondarySideDetails;