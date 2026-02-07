/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                worko: {
                    blue: '#316BFF',
                    lightBlue: '#38A1D6',
                    bg: '#F3F4F6',
                }
            },
            backgroundImage: {
                'worko-gradient': 'linear-gradient(90deg, #316BFF 0%, #38A1D6 100%)',
            },
            boxShadow: {
                'worko': '0 4px 20px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
