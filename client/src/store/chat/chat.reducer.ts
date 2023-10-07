import { SET_CHATS, FETCH_CHAT, SET_CURRENT_CHAT, SEND_MESSAGE } from "./chat.types"

const CHAT_INITIAL_STATE = {
  chats: [],
  currentChat: {
    messages: [],
  },
}

export const chat = (state = CHAT_INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_CHATS: {
      console.log('SET_CHATS action::', action);
      return {
        ...state,
        chats: action.data,
      }
    }

    case SET_CURRENT_CHAT: {
      console.log('SET_CURRENT_CHAT acction::', action);
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
          messages: [action.data, ...state.currentChat.messages]
        }
      }
    }

    default: return state;
  }
};

export default chat;
