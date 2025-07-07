'use client';

import { useEffect, useState } from 'react';

const frames = ['|', '/', '-', '\\'];

interface TerminalLoadingProps {
    text?: string;
    speed?: number; // in ms
    className?: string;
}

export default function Loading({
    text = 'Loading',
    speed = 100,
    className = '',
}: TerminalLoadingProps) {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % frames.length);
        }, speed);
        return () => clearInterval(interval);
    }, [speed]);

    return (
        <div className={`font-mono text-green-500 font-bold text-[25px] ${className}`}>
            {text} {frames[frameIndex]}
        </div>
    );
}
