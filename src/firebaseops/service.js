import { setDoc, doc, getDocs, collection } from 'firebase/firestore'
import { db } from './config'


const getAllDocs = async (collectionPath='') => {
    try {
        if (!collectionPath) throw 'Missing collection path!'
        const querySnapshot = await getDocs(collection(db, collectionPath))
        const results = querySnapshot.docs.map((doc) => {
            return doc.data()
        })
        return results
    } catch (e) {
        console.error("Error on get all documents: ", e)
        throw { success: false, message: e?.message || e }
    }
}
const upsertDoc = async (collectionPath='', data={}, docId) => {
    try {
        if (!collectionPath) throw 'Missing collection path!'
        const docRef = doc(db, collectionPath, docId.toString())
        await setDoc(docRef, data, { merge: true })
        return {success: true, id: docId}
    } catch (e) {
        console.error("Error on create document: ", e)
        throw { success: false, message: e?.message || e }
    }
}

export default {
    getAllDocs,
    upsertDoc
}