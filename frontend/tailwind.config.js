module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                'screen-dvh': '100dvh', // Dynamische Höhe für iOS
            },
        },
    },
    plugins: [],
};
