import { collection, query, where } from "firebase/firestore"
import { db } from "firebaseops/config"
import service from "firebaseops/service"

const getWatchedList = async () => {
    try {
        const collectionPath = "movie_db/8589830226/my_list"
        const condition = query(collection(db, collectionPath), where('is_watched_list', '==', true))
        const response = await service.getAllDocs(collectionPath, condition)
        return response
    } catch (e) {
        throw e?.message || e
    }
}
const upsertToMyList = async (reqData={}) => {
    try {
        const collectionPath = "movie_db/8589830226/my_list"
        const response = await service.upsertDoc(collectionPath, reqData, reqData.id)
        return response
    } catch (e) {
        throw e?.message || e
    }
}
const getFavouriteList = async () => {
    try {
        const collectionPath = "movie_db/8589830226/my_list"
        const condition = query(collection(db, collectionPath), where('is_favourite', '==', true))
        const response = await service.getAllDocs(collectionPath, condition)
        return response
    } catch (e) {
        throw e?.message || e
    }
}

export default {
    getWatchedList,
    upsertToMyList,
    getFavouriteList
}