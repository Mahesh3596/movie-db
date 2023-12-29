import React, { useEffect, useState } from "react";
import Loader from "components/loader/Loader";
import TMDBConfig from "services/TMDBConfig";
import SnackbarComp from "components/common/SnackbarComp";

export const AppContext = React.createContext({})

export const AppContextProvider = ({children}) => {
    const [tmdbConfig, setTMDBConfig] = useState(null)
    const [isLoading, setIsLoading] = useState({count: 0})
    const [snackbar, setSnackbar] = useState({show: false})
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
    const showSnackbar = (snackbarConfig) => setSnackbar(snackbarConfig)
    const onSnackbarClose = () => setSnackbar({show: false})
    return(
        <AppContext.Provider
            value={{
                tmdbConfig,
                getTMDBConfigValue,
                showLoading,
                showSnackbar
            }}
        >
            {isLoading.count > 0 && <Loader/>}
            {snackbar.show && <SnackbarComp onClose={onSnackbarClose} open={snackbar.show} variant={snackbar.type} message={snackbar.message}/>}
            {children}
        </AppContext.Provider>
    )
}