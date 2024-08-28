"use client";

import { db } from "../firebase";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import useSWRSubscription from 'swr/subscription';

interface PostData {
    [key: string]: any; // Define the structure of your post data here if possible
}

interface UsePostsReturn {
    data: PostData[] | undefined;
    error: string | null;
    isLoading: boolean;
}

export function usePosts(): UsePostsReturn {
    const { data, error } = useSWRSubscription(['posts'], ([path], { next }) => {
        const ref = collection(db, path);
        
        const unsub = onSnapshot(ref, (snapshot: QuerySnapshot<DocumentData>) => {
            const posts = snapshot.docs.map(doc => doc.data());
            next(null, posts);
        }, (error) => {
            next(error?.message);
        });

        return () => unsub();
    });

    console.log('Posts data:', data, 'Error:', error);

    return {
        data,
        error: error || null,
        isLoading: data === undefined
    };
}
