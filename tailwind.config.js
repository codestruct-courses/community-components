const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    content: [
        './layouts/**/*.{html,js,ts,jsx}',
        './pages/**/*.{html,js,ts,jsx}',
        './components/**/*.{html,js,ts,jsx}'
    ],
    theme: {
        extend: {
            colors: {
                'black': '#000000',
                'solitude': '#f5f5f5'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
            },
            rotate: {
                '17': '17deg',
            },
            keyframes: {
                shake: {
                    '0%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(2px)' },
                    '50%': { transform: 'translateX(4px)' },
                    '75%': { transform: 'translateX(2px)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            animation: {
                'shake': 'shake 1s linear infinite',
            },
        },
        minHeight: {
            'half': '125px',
            'textarea': '250px',
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
};
