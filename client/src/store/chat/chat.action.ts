import { FETCH_CHATS, FETCH_CHAT, SEND_MESSAGE, RESET_CHATS } from "./chat.types";

export const sendMessage = (data: { body: string, sender: string; }) => ({ type: SEND_MESSAGE, data });
export const fetchChats = (data: string) => ({ type: FETCH_CHATS, data });
export const fetchChat = (data: string) => ({ type: FETCH_CHAT, data });
export const resetChats = () => ({ type: RESET_CHATS });
