import TelegramBotClient from 'node-telegram-bot-api'

export default class Bot {
    constructor(token) {
        this.client = new TelegramBotClient(token, { polling: true })
        this.client.on("polling_error", (msg) => console.log(msg));
    }

    start() {

        const antiboomerMessage = "@${nome} non essere boomer e non urlare! per questa volta te lo correggo io il tuo messaggio. Visto, era cosi difficile?";

        this.client.on('message', message => {
            // console.log('Got a message', message)
            const text = message.text;
            if(text && this.checkUpperCase(text)) {
                const newMessage = `@${message.from.username} ha detto:`+text.toLowerCase();
                this.client.sendMessage(message.chat.id, newMessage, {reply_to_message_id: message.message_id});
                this.client.sendMessage(message.chat.id, antiboomerMessage.replace('${nome}',message.from.username));
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


    
}