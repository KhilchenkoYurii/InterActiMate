import { SET_CHATS, SET_CURRENT_CHAT, SEND_MESSAGE } from "./chat.types"

const CHAT_INITIAL_STATE = {
  chats: [],
  currentChat: {
    messages: [],
  },
}

export const chat = (state = CHAT_INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_CHATS: {
      return {
        ...state,
        chats: action.data,
      }
    }

    case SET_CURRENT_CHAT: {
      // TODO:
      return {
        ...state,
        currentChat: action.data,
      }
    }

    case SEND_MESSAGE: {
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, action.data]
        }
      }
    }

    default: return state;
  }
};

export default chat;
