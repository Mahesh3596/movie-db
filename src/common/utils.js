export const getMovieTitleFromURL = (pathURL) => {
    let formattedTitle=''
    let title = pathURL.split('/')[3]
    title = title.replaceAll('_',' ')
    title.split(' ').map(str => formattedTitle = formattedTitle+' '+str.charAt(0).toUpperCase()+str.slice(1))
    return formattedTitle.trim()+(pathURL.split('/')[2] == 'tv' ? ' Tv Shows' : ' Movies')
}