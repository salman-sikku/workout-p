import {db} from '../firebase';
import {getDocs, getDoc, doc, collection} from 'firebase/firestore';

export const getAllPosts = async ()=>{
    return await getDocs(collection(db, 'posts')).then((snaps) => snaps.docs.map((d)=> d.data()))
}


export const getSinglePost = async (id) => {
    try {
        const docRef = doc(db, `posts/${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        return null;
    }
};
