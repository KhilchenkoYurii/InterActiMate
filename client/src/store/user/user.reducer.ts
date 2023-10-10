import { SET_USER } from "./user.types";

const USER_INITIAL_STATE = {
  answeredPosts: [],
  avatar: null,
  bio: null,
  chats: null,
  createdPosts: null,
  email: null,
  favoritePosts: null,
  name: null,
  nickname: null,
  passwordChangedAt: null,
  phone: null,
  showOnlyNickname: false,
  surname: null,
  userId: null,
};

export const user = (state = USER_INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.data
      };
    }

    default: return state;
  }
};

export default user;
