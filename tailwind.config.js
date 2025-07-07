export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                terminal: ['"Terminal"', 'monospace'],
            },
            scrollbar: {
                width: {
                    none: '0px',
                    sm: '8px',
                    md: '12px',
                },
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};
