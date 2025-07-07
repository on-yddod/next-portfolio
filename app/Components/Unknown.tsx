
interface IUnknownProps {
    input: string
}

export default function Unknown({ input }: IUnknownProps) {
    return (
        <div>
            <div className="w-full">
                <p>{'~>'} {input}</p>
                <p className="text-red-400">Unknown `{input}` command!</p>
                <p className="text-white">See `help` for info</p>
            </div>
        </div>
    );
}