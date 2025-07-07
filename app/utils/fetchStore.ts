import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.client";

export const fetchStore = async <T>(
    collectionName: string,
    onSuccess: (data: T[]) => void,
    onError?: (e: unknown) => void
) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const result: T[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data() as T;
            result.push(data);
        });

        console.log("✅ Fetched from Firestore:", result);
        onSuccess(result);
    } catch (error) {
        console.error("❌ Error fetching store:", error);
        if (onError) onError(error);
    }
};
