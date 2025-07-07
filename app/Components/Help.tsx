interface CommandData {
    command: string;
    type: "general" | "special";
    title: string;
    output: string;
}

export default function Help({ commandListParam }: any) {
    return (
        <div>
            <p>{'~>'} help</p>
            {
                commandListParam && commandListParam.map((item: CommandData, index: number) => (
                    <div key={index} className="flex justify-between w-full px-4">
                        <p><span className="text-[10px]">⌘</span> {item.command}</p>
                        <p>{item.title}</p>
                    </div>
                ))
            }
        </div>
    );
}