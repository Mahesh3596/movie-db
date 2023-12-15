import service from "firebaseops/service"

const addToWatchedList = async (reqData={}) => {
    const collectionPath = "movie_db/8589830226/my_watched_list"
    const createRes = await service.createDoc(collectionPath, reqData)
    // console.log('createRes >> ', createRes)
    return createRes
}

export default {
    addToWatchedList
}