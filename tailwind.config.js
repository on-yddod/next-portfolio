export default {
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

}
