import React, { useEffect, useState } from "react";
import Loader from "components/loader/Loader";
import { getConfigurationDetails, getGenreList } from "services/TMDBConfig";

export const AppContext = React.createContext({})

export const AppContextProvider = ({children}) => {
    let showLoader={count: 0};
    const [tmdbConfig, setTMDBConfig] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (showLoader.count > 1 && !isLoading) setIsLoading(true)
        if (showLoader.count <= 0) setIsLoading(false)
    }, [showLoader])
    const getTMDBConfigValue = async () => {
        try {
            if (!tmdbConfig) {
                const cdRes = await getConfigurationDetails()
                const genreRes = await getGenreList()
                setTMDBConfig((prevState) => ({
                    ...prevState,
                    ...cdRes,
                    ...genreRes
                }))
            }
        } catch (err) {
            console.error(err)
        }
    }
    const showLoading = (isShow=false) => {
        if (isShow) {
            showLoader.count=+1
        } else if(showLoader > 0) {
            showLoader.count=-1
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
            {isLoading && <Loader/>}
            {children}
        </AppContext.Provider>
    )
}