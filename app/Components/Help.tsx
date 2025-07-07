interface CommandData {
    command: string;
    type: "general" | "special";
    title: string;
    output: string;
}

interface HelpProps {
    commandListParam: CommandData[];
}

export default function Help({ commandListParam }: HelpProps) {
    return (
        <div>
            <p>{"~>"} help</p>
            {commandListParam.map((item, index) => (
                <div key={index} className="flex justify-between w-full px-4">
                    <p>
                        <span className="text-[10px]">⌘</span> {item.command}
                    </p>
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    );
}
