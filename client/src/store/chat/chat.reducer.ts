import { SET_CHATS, SET_CURRENT_CHAT, SEND_MESSAGE, RESET_CHATS } from "./chat.types"

const CHAT_INITIAL_STATE = {
  // TODO: chat types
  chats: [] as any[],
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

    case RESET_CHATS: {
      return {
        ...state,
        currentChat: {
          messages: [],
        },
      }
    }

    case SEND_MESSAGE: {
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, action.data]
        },
        chats: [
          ...state.chats.map((chat) => {
            if (chat?.chatId === action?.data?.chatId) {
              return {
                ...chat,
                firstMessage: action?.data?.body
              }
            };
            return chat;
          })
        ],
      }
    }

    default: return state;
  }
};

export default chat;
