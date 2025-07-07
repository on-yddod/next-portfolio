import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.client";

export const fetchStore = async (
    collectionName: string,
    onSuccess: (data: any[]) => void,
    onError?: (e: any) => void
) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const result: any[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            result.push(data);
        });

        console.log("✅ Fetched from Firestore:", result);
        onSuccess(result);
    } catch (error) {
        console.error("❌ Error fetching store:", error);
        if (onError) onError(error);
    }
};
