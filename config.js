export const config = { 
    url: '127.0.0.1',
    port: process.env.PORT || 8080,
    telegram: {
        baseUrl: 'https://api.telegram.org/bot',
        token: process.env.BOT_TOKEN
    }
}
