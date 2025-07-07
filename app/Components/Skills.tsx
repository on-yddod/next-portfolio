import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import { fetchStore } from "../utils/fetchStore";

interface ISkillData {
    core: string;
    framework: string;
    database: string;
    learning: string;
}

export default function Skills() {
    const [skillData, setSkillData] = useState<ISkillData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasAlreadyLoaded, setHasAlreadyLoaded] = useState<boolean>(false);

    const fetchProjectData = useCallback(async () => {
        // console.log("fetchProjectData()");

        if (isLoading || hasAlreadyLoaded) return;

        // console.log("isLoading = true");
        setIsLoading(true);

        await fetchStore<ISkillData>(
            "skills",
            (data) => setSkillData(data)
        );

        // console.log("isLoading = false");
        setHasAlreadyLoaded(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [isLoading, hasAlreadyLoaded]);

    useEffect(() => {
        fetchProjectData();
    }, [fetchProjectData]);

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
            <p>{'~>'} skills</p>
            <p className="text-[23px] text-white">My Skills :</p>
            <div className="flex flex-col w-full my-6">
                <p>The web technologies dominating at the time :</p>
                <p><span className="font-bold">Core :</span> {skillData[0]?.core}</p>
                <p><span className="font-bold">Framework :</span> {skillData[0]?.framework}</p>
                <p><span className="font-bold">Database :</span> {skillData[0]?.database}</p>
                <p className="font-bold">{skillData[0]?.learning}</p>
            </div>
        </div>
    );

    return (
        <div>
            {isLoading
                ? loadingUI
                : !isLoading && skillData.length === 0
                    ? noDataUI
                    : alreadyDataUI}
        </div>
    );
}
