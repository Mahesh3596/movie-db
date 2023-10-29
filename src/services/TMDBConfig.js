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

module.exports = {
    getConfigurationDetails
}