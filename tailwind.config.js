/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                'sidebar-bg': '#1A1B25',
                'content-bg': '#232535',
                'button-active': '#a78bfa',
                'button-hover': '#4a5568',
                'button-inactive': '#99a2a8',
                'text-primary': '#FFFFFF',
                'text-secondary': '#A1A1AA',
                'text-active': '#a793f8',
                'active-glow': '#7D5DFE',
                'search-bg': '#2C2E3D',
                'field-bg': '#222e40'
            },
            boxShadow: {
                'white-glow': '0 0 10px 2px rgba(255, 255, 255, 0.8)',
                'purple-glow': '0 0 10px 2px rgba(125, 93, 254, 0.8)',
            },
            backgroundImage: {
                'gradient-ring': 'linear-gradient(135deg, #FF6B6B 0%, #6BFF6B 50%, #FFD93D 100%)'
            }
        },
    },
    plugins: [
        function ({addUtilities}) {
            const newUtilities = {
                '.gradient-ring': {
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        bottom: '-2px',
                        zIndex: '-1',
                        backgroundImage: 'inherit',
                        borderRadius: 'inherit',
                        padding: '2px',
                        backgroundClip: 'padding-box',
                    },
                },
            };
            addUtilities(newUtilities);
        },
    ]
}
