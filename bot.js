import TelegramBotClient from 'node-telegram-bot-api'
import Promise from 'bluebird';
Promise.config({
  cancellation: true
});
export default class Bot {
    constructor(token) {
        this.telegramBot = new TelegramBotClient(token)
        this.telegramBot.on("polling_error", (msg) => console.log(msg));
    }

    async start() {
        await this.telegramBot.startPolling({ restart: true });
        const antiboomerMessage = "@${nome} non essere boomer e non urlare! per questa volta te lo correggo io il tuo messaggio. Visto, era cosi difficile?";

        this.telegramBot.on('message', message => {
            // console.log('Got a message', message) // debug log
            // message.text sono i messaggi normali.
            // message.caption sono le descrizioni dei video
            const text = message.text || message.caption;
            if(text && this.checkUpperCase(text)) {
                const newMessage = text.toLowerCase();
                const forwarder = message.forward_from_chat?.username || message.forward_sender_name || message.from.username;
                this.telegramBot.sendMessage(message.chat.id, newMessage, {reply_to_message_id: message.message_id});
                this.telegramBot.sendMessage(message.chat.id, antiboomerMessage.replace('${nome}', forwarder));
            }
        })
    }

    /**
     * Controlla se il testo scritto ha più di 5 caratteri (altrimenti viene ignorato)
     * e se 1/3 del messaggio è scritto in maiuscolo
     * @param {string} text 
     * @returns true se è un testo da bonificare, false altrimenti
     */
    checkUpperCase(text) {
        return text.length > 5 && (text.match(/[A-Z]/g) || []).length > (text.length * 0.3);
    }

    async stop(){
        if (this.telegramBot != null) {
          await this.telegramBot.stopPolling({ cancel: true });
          this.telegramBot = null;
        }
        process.exit();
    }



    
}
