import { SEND_MESSAGE } from "./chat.types";

export const sendMessage = (data: string) => ({ type: SEND_MESSAGE, data });
