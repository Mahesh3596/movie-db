import { setDoc, doc } from 'firebase/firestore'
import { db } from './config'


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
    upsertDoc
}