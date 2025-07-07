import { useCallback, useEffect, useState } from "react";
import { fetchStore } from "../utils/fetchStore";
import Loading from "./Loading";

interface IContactData {
    title: string;
    reference: string;
    description: string;
}

export default function Contact() {
    const [contactData, setContactData] = useState<IContactData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasAlreadyLoaded, setHasAlreadyLoaded] = useState<boolean>(false);

    const fetchContactData = useCallback(async () => {
        // console.log("fetchContactData()");

        if (isLoading || hasAlreadyLoaded) return;

        // console.log("isLoading = true");
        setIsLoading(true);

        await fetchStore<IContactData>(
            "contact",
            (data) => setContactData(data),
            (err: unknown) => {
                // console.error("Error:", err);
            }
        );

        // console.log("isLoading = false");
        setHasAlreadyLoaded(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [isLoading, hasAlreadyLoaded]);

    useEffect(() => {
        fetchContactData();
        // console.log(contactData);
    }, [fetchContactData]);

    const loadingUI = (
        <div className="w-full text-center p-5">
            <Loading className="loading" />
        </div>
    );

    const noDataUI = (
        <div className="w-full text-center p-5">
            <p className="text-white">No Project Data!</p>
        </div>
    );

    const alreadyDataUI = (
        <div>
            <p>{"~>"} contact</p>
            <p className="text-[23px] text-white">Contact me :</p>
            <div className="my-3">
                {contactData.map((item, index) => (
                    <div key={index} className="flex justify-between w-full px-4">
                        <p><span className="text-[10px]">#</span> {item.title}</p>
                        <p>
                            <a
                                href={item.reference}
                                className="text-blue-500 underline font-bold"
                            >
                                {item.description}
                            </a>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {isLoading
                ? loadingUI
                : !isLoading && contactData.length === 0
                    ? noDataUI
                    : alreadyDataUI}
        </div>
    );
}
