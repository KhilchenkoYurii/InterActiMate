import { SEND_MESSAGE } from "./chat.types"

const CHAT_INITIAL_STATE = {
  chats: [],
  currentChat: {
    messages: [],
  },
}

export const chat = (state = CHAT_INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [action.data, ...state.currentChat.messages]
        }
      }
    }

    default: return state;
  }
};

export default chat;
