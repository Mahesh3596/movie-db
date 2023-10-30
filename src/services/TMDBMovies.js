const { tmdb_bearer_token, tmdb_base_url } = require("config");

const getTrendingMovies = async ({showType='movie', type='day', language='en-US'}) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: tmdb_bearer_token
        }
      };
      
    return await fetch(`${tmdb_base_url}/trending/${showType}/${type}?language=${language}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}
const getUpcomingMovies = async ({language='en-US', page=1}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: tmdb_bearer_token
    }
  };
  return await fetch(`${tmdb_base_url}/movie/upcoming?language=${language}&page=${page}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}
const getUpcomingMovieVideos = async ({movieId, language='en-US'}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: tmdb_bearer_token
    }
  };
  
  return await fetch(`${tmdb_base_url}/movie/${movieId}/videos?language=${language}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}
const getAllMovies = async ({language='en-US', page=1}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: tmdb_bearer_token
    }
  };
  
  return await fetch(`${tmdb_base_url}/movie/popular?language=${language}&page=${page}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
}

module.exports = {
    getTrendingMovies,
    getUpcomingMovies,
    getUpcomingMovieVideos,
    getAllMovies
}