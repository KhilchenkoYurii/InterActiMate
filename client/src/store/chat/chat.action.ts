import { FETCH_CHATS, FETCH_CHAT, SEND_MESSAGE } from "./chat.types";

export const sendMessage = (data: { body: string }) => ({ type: SEND_MESSAGE, data });
export const fetchChats = (data: string) => ({ type: FETCH_CHATS, data });
export const fetchChat = (data: string) => ({ type: FETCH_CHAT, data });
