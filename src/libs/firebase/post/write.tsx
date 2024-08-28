import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

export const createNewBlog = async ({ data, image }: any) => {
    // if (!data?.title) {
    //     throw new Error('Title is required');
    // }
    // if (!data?.slug) {
    //     throw new Error('Slug is required');
    // }
    // if (!image) {
    //     throw new Error('Image is required');
    // }

    const imageRef = ref(storage, `posts/${data?.slug}.png`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const firebaseRef = doc(db, `posts/${data?.slug}`);
    await setDoc(firebaseRef, {
        ...data,
        id: data?.slug,
        imageUrl: imageUrl,
        timestamp: Timestamp.now(),
    });
};
