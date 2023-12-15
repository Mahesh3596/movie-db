import moment from "moment"

export const getAllMovieTitleFromURL = (pathURL) => {
    let formattedTitle=''
    let title = pathURL.split('/')[3]
    title = title.replaceAll('_',' ')
    title.split(' ').map(str => formattedTitle = formattedTitle+' '+str.charAt(0).toUpperCase()+str.slice(1))
    return formattedTitle.trim()+(pathURL.split('/')[2] == 'tv' ? ' Tv Shows' : ' Movies')
}

export const getAllMovieTypeFromURL = (pathURL) => {
    return pathURL.split('/')[2]
}

export const getCamelcase = (string) => {
    let formattedStr=''
    string.split(' ').map(str => formattedStr = formattedStr+' '+str.charAt(0).toUpperCase()+str.slice(1))
    return formattedStr
}

export const getGender = (gender) => {
    return gender === 2 ? 'Male' : gender === 1 ? 'Female' : 'NA'
}

export const getFormattedDate = (date, format) => {
    return date ? moment(date).format(format) : 'NA'
}

export const getFormattedVoteCount = (voteCount) => {
    let formatted = ''
    if (voteCount >= 100000 && voteCount < 10000000) 
        formatted = parseFloat(voteCount/1000000).toPrecision(2)+'m'
    else if (voteCount >= 1000 && voteCount < 100000) 
        formatted = parseFloat(voteCount/1000).toPrecision(2)+'k'
    else if (voteCount < 1000) 
        formatted = voteCount
    else
        formatted = voteCount
    return formatted + ' votes'
}

export const getRatingRounded = (rating) => {return Math.round(rating * 10) / 10}