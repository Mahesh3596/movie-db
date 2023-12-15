import { collection, addDoc } from 'firebase/firestore'
import { db } from './config'


const createDoc = async (collectionPath='', data={}) => {
    try {
        if (!collectionPath) throw 'Missing collection path!'
        const docRef = await addDoc(collection(db, collectionPath), data)
        // console.log("Document written with ID: ", docRef.id);
        return docRef
    } catch (e) {
        console.error("Error on create document: ", e)
    }
}

export default {
    createDoc
}