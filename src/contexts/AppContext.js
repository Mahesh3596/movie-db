import React, { useEffect, useState } from "react";
import Loader from "components/loader/Loader";
import TMDBConfig from "services/TMDBConfig";

export const AppContext = React.createContext({})

export const AppContextProvider = ({children}) => {
    const [tmdbConfig, setTMDBConfig] = useState(null)
    const [isLoading, setIsLoading] = useState({count: 0})
    const getTMDBConfigValue = async () => {
        try {
            if (!tmdbConfig) {
                const cdRes = await TMDBConfig.getConfigurationDetails()
                const genreRes = await TMDBConfig.getGenreList()
                const languageRes = await TMDBConfig.getLanguageList()
                setTMDBConfig((prevState) => ({
                    ...prevState,
                    ...cdRes,
                    ...genreRes,
                    languages: languageRes
                }))
            }
        } catch (err) {
            console.error(err)
        }
    }
    const showLoading = (isShow=false) => {
        if (isShow) {
            setIsLoading(prevState => ({count: prevState.count+1}))
        } else {
            setIsLoading(prevState => ({count: prevState.count-1}))
        }
    }
    return(
        <AppContext.Provider
            value={{
                tmdbConfig,
                getTMDBConfigValue,
                showLoading
            }}
        >
            {isLoading.count > 0 && <Loader/>}
            {children}
        </AppContext.Provider>
    )
}