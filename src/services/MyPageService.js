import service from "firebaseops/service"

const getWatchedList = async () => {
    try {
        const collectionPath = "movie_db/8589830226/my_watched_list"
        const response = await service.getAllDocs(collectionPath)
        return response
    } catch (e) {
        throw e?.message || e
    }
}
const upsertToWatchedList = async (reqData={}) => {
    try {
        const collectionPath = "movie_db/8589830226/my_watched_list"
        const response = await service.upsertDoc(collectionPath, reqData, reqData.id)
        return response
    } catch (e) {
        throw e?.message || e
    }
}

export default {
    getWatchedList,
    upsertToWatchedList
}