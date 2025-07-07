const laotopCollegeReference = <a className="text-blue-500 font-bold underline" href="https://laotop.net/" target="_blank" rel="noopener noreferrer">Lao Top College</a>;

export default function Education() {
    return (
        <div>
            <p>{"~>"} education</p>
            <div className="flex flex-col w-full my-6">
                <p className="text-[23px] text-white">Education :</p>
                <p>I am a student at {laotopCollegeReference}. I am in my third year, which is my final year of college.</p>
            </div>
        </div>
    );
}


