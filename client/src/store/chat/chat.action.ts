import { FETCH_CHATS, FETCH_CHAT_BY_ID, SEND_MESSAGE, RESET_CHATS } from "./chat.types";

export const sendMessage = (data: { chatId: string, body: string, sender: string; }) => ({ type: SEND_MESSAGE, data });
export const fetchChats = (data: string) => ({ type: FETCH_CHATS, data });
export const fetchChatById = (data: string) => ({ type: FETCH_CHAT_BY_ID, data });
export const resetChats = () => ({ type: RESET_CHATS });
