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
const getAllMovies = async (urlEndpoint, filter) => {
  let URL = `${tmdb_base_url}${urlEndpoint}?`
  URL = URL+`page=${(filter?.page) ? filter.page : 1}&`
  URL = URL+((filter.hasOwnProperty('language')) ? `with_original_language=${filter?.language || 'en'}&` : 'language=en-US&')
  if (filter?.genres && filter.genres.length > 0) URL = URL+`with_genres=${filter.genres.join(',')}&`
  if (filter?.ratingRange) URL = URL+`vote_average.gte=${filter.ratingRange[0]}&vote_average.lte=${filter.ratingRange[1]}&`
  if (filter?.ratingVotes) URL = URL+`vote_count.gte=${filter.ratingVotes}&`
  if (filter?.from) URL = URL+`primary_release_date.gte=${filter.from}&`
  if (filter?.to) URL = URL+`primary_release_date.lte=${filter.to}&`
  // console.log('URL >> ', URL)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: tmdb_bearer_token
    }
  };
  
  // return await fetch(`${tmdb_base_url}/discover/movie?with_original_language=ta&page=${page}`, options) //for tamil language movies
  return await fetch(URL, options)
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