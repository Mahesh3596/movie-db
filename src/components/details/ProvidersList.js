import { Button, Typography } from "@mui/material";
import { AppContext } from "contexts/AppContext";
import { useContext, useState } from "react";
import TMDBMovies from "services/TMDBMovies";

const ProvidersList = ({details=null, imageBaseURL='', showType=''}) => {
    const {showLoading} = useContext(AppContext)
    const [providers, setProviders] = useState(null)
    const onViewProvidersClick = async () => {
        showLoading(true)
        const providerRes = await TMDBMovies.getDetails(`/${showType}/${details.id}/watch/providers`)
        const provObj = providerRes.results['IN'] || Object.values(providerRes.results)[0]
        const provList = [...provObj?.flatrate || [], ...provObj?.buy || [], ...provObj?.rent || []]
        const filteredList = provList.length > 0 ? 
            Array.from(new Set(provList.map(a => a.provider_id))).map(provider_id => { return provList.find(a => a.provider_id === provider_id) })
            : []
        setProviders(filteredList)
        showLoading(false)
    }
    return (details && <div>
        {!providers && <Button variant="outlined" onClick={onViewProvidersClick}>
            View Providers
        </Button>}
        {providers && <div>
            <Typography sx={{fontSize: '14px'}} fontWeight='bold'>Provider</Typography>
            {providers?.length > 0 ? providers.map(prov => <img width="50px" key={prov.provider_id} src={`${imageBaseURL}w92${prov.logo_path}`}/>) : '-'} 
        </div>}
    </div>)
}

export default ProvidersList;