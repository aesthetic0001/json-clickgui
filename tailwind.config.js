/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                'sidebar-bg': '#1A1B25', // Background color of the sidebar
                'content-bg': '#232535', // Background color of the main content
                'text-primary': '#FFFFFF', // Primary text color
                'text-secondary': '#A1A1AA', // Secondary text color
                'text-active': '#a793f8',
                'active-glow': '#7D5DFE', // Glow effect color,
                'search-bg': '#2C2E3D', // Background color of the search bar
            },
            boxShadow: {
                'white-glow': '0 0 10px 2px rgba(255, 255, 255, 0.8)', // White glow
                'purple-glow': '0 0 10px 2px rgba(125, 93, 254, 0.8)', // Purple glow
            },
            backgroundImage: {
                'gradient-ring': 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #6BFF6B 100%)', // Custom gradient
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
