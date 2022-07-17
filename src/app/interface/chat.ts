export interface Chat {
    message: string,
    chatID: string,
    channelID: string
}
// export class ChatToJSON {
//     message: string;
//     chatID: string;
//     channelID: string;


//     constructor(msg?: any) {
//         this.message = msg ? msg.message : '';
//         this.chatID = msg ? msg.chatID : '';
//         this.channelID = msg ? msg.channelID : '';
//     }
//     public toJSON() {
//         return {
//             message: this.message,
//             chatID: this.chatID,
//             channelID: this.channelID,
//         }
//     }
// }
