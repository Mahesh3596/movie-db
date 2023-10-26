const { tmdb_bearer_token, tmdb_base_url } = require("../config");

const getTrendingMovies = async ({type='day', language='en-US'}) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: tmdb_bearer_token
        }
      };
      
    return await fetch(`${tmdb_base_url}/trending/movie/${type}?language=${language}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}

module.exports = {
    getTrendingMovies
}