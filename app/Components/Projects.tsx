import { useCallback, useEffect, useState } from "react";
import { fetchStore } from "../utils/fetchStore";
import Loading from "./Loading";

interface IProjectData {
    title: string;
    description: string;
    reference: string;
    core: string[];
}

export default function Projects() {
    const [projectData, setProjectData] = useState<IProjectData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasAlreadyLoaded, setHasAlreadyLoaded] = useState<boolean>(false);

    const fetchProjectData = useCallback(async () => {
        console.log("fetchProjectData()");

        if (isLoading || hasAlreadyLoaded) return;

        console.log("isLoading = true");
        setIsLoading(true);

        await fetchStore<IProjectData>(
            "projects",
            (data) => setProjectData(data),
            (err: unknown) => console.error("Error:", err)
        );

        console.log("isLoading = false");
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
            <p>{'~>'} projects</p>
            <div className="my-2">
                <p className="text-[23px] text-white font-bold">My Project :</p>
                {projectData.map((project, index) => (
                    <div className="my-6" key={index}>
                        <div>
                            <p>
                                <a
                                    href={project.reference}
                                    className="text-blue-500 font-bold text-[15px] underline"
                                >
                                    {project.title}
                                </a>{" "}
                                - <span className="text-white">{project.core.join(", ")}</span>
                            </p>
                        </div>
                        <div>
                            <p>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {isLoading
                ? loadingUI
                : !isLoading && projectData.length === 0
                    ? noDataUI
                    : alreadyDataUI}
        </div>
    );
}
