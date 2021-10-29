/**
 * Name: antiboomerbot
 * Author: gmammolo@gmail.com
 */

// load process.env variables
import {} from 'dotenv/config';

import http from 'http';
import {config} from './config.js';
import TelegramBot from './bot.js';


// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // Send back a response and end the connection
    if(config.telegram.token) {
        res.end('Server in funzione, puoi usare tranquillamente il bot!\n');
    } else {
        res.end('Problemi con il server, verifica il log ( heroku logs --tail -a antiboomer-bot )!\n');
    }
});

// Start the server on port 3000
app.listen(config.port, config.url);
console.log(`Node server running on port ${config.port}`);

// start bot
if(config.telegram.token) {
    const bot =  new TelegramBot(config.telegram.token);
    bot.start();
} else {
    console.error('Token di telegram non trovato!')
}

// process.on('SIGQUIT', bot.stop);
// process.on('SIGINT', bot.stop);

