import { collection, orderBy, query, where } from "firebase/firestore"
import { db } from "firebaseops/config"
import service from "firebaseops/service"

const getWatchedList = async () => {
    try {
        const collectionPath = "movie_db/8589830226/my_list"
        const condition = query(collection(db, collectionPath), where('is_watched_list', '==', true), orderBy('created_on'))
        const response = await service.getAllDocs(collectionPath, condition)
        return response
    } catch (e) {
        throw e?.message || e
    }
}
const upsertToWatchedList = async (reqData={}) => {
    try {
        const collectionPath = "movie_db/8589830226/my_list"
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