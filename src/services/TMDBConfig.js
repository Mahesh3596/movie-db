const { tmdb_bearer_token, tmdb_base_url } = require("config");

const getConfigurationDetails = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: tmdb_bearer_token
        }
    };
    return await fetch(`${tmdb_base_url}/configuration`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}
const getGenreList = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: tmdb_bearer_token
        }
    };
      
    return await fetch(`${tmdb_base_url}/genre/movie/list?language=en`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}
const getLanguageList = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: tmdb_bearer_token
        }
    };
      
    return await fetch(`${tmdb_base_url}/configuration/languages`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}

module.exports = {
    getConfigurationDetails,
    getGenreList,
    getLanguageList
}