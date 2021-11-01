/**
 * Name: antiboomerbot
 * Author: gmammolo@gmail.com
 */

// load process.env variables
import {} from 'dotenv/config';
import https from 'https';
import {config} from './config.js';
import TelegramBot from './bot.js';
import express from 'express';

var app     = express();
app.set('port', config.port);

app.get('/', function(request, response) {
    var simpleResult = "<h1> AntiBoomer-Bot in funzione </h1>"+
    "Se vedi questa pagina, il bot telegram dovrebbe funzionare correttamente."+
    "cerca su telegram @antiboomerbot";
    response.send(simpleResult);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// start bot
if(config.telegram.token) {
    const bot =  new TelegramBot(config.telegram.token);
    bot.start();

    process.on('SIGQUIT', bot.stop);
    process.on('SIGINT', bot.stop);

} else {
    console.error('Token di telegram non trovato!')
}


//HEROKU fix: fa una chiamata ad heroku ogni 15 sec per tenere il server attivo
if(process.env.RHEROKU) {
    const timer = 900000; // 15 min
    const interval = setInterval(() => {
        https.get(process.env.RHEROKU, (res) => {
            console.log(`ping server run.... statusCode: ${res.statusCode}`)
        });
    },timer);
    
    // to block interval
    // clearInterval(interval);  
}



