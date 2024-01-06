import moment from "moment"

export const buildRequestBody = (details, isUpdate=false) => {
    const buildReq = {
        id: details.id,
        backdrop_path: details.backdrop_path,
        budget: details.budget,
        original_language: details.original_language,
        original_title: details.original_title,
        overview: details.overview,
        poster_path: details.poster_path,
        release_date: details.release_date,
        revenue: details.revenue,
        runtime: details.runtime,
        tagline: details.tagline, title: details.title, status: details.status,
        vote_average: details.vote_average, vote_count: details.vote_count,
    }
    if (isUpdate) { buildReq.updated_on = moment.utc().format() }
    else {
        buildReq.created_on = moment.utc().format()
        buildReq.updated_on = moment.utc().format()
    }
    return buildReq
}