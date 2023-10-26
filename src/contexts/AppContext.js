import React, { useState } from "react";
import { getConfigurationDetails } from "../services/TMDBConfig";

export const AppContext = React.createContext({})

export const AppContextProvider = ({children}) => {
    const [tmdbConfig, setTMDBConfig] = useState(null)
    const getTMDBConfigValue = async () => {
        try {
            if (!tmdbConfig) {
                const cdRes = await getConfigurationDetails()
                setTMDBConfig((prevState) => ({
                    ...prevState,
                    ...cdRes
                }))
            }
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <AppContext.Provider
            value={{
                tmdbConfig,
                getTMDBConfigValue
            }}
        >
            {children}
        </AppContext.Provider>
    )
}