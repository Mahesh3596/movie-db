import service from "firebaseops/service"

const upsertToWatchedList = async (reqData={}) => {
    try {
        const collectionPath = "movie_db/8589830226/my_watched_list"
        const response = await service.upsertDoc(collectionPath, reqData, reqData.id)
        return response
    } catch (err) {
        throw err?.message || err
    }
}

export default {
    upsertToWatchedList
}