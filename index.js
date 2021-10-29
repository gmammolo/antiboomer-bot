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
    res.end('Server in funzione, puoi usare tranquillamente il bot!\n');
});

// Start the server on port 3000
app.listen(config.port, config.url);
console.log(`Node server running on port ${config.port}`);

// start bot
const bot =  new TelegramBot(config.telegram.token);
bot.start();
