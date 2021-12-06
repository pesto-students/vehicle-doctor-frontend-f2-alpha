import { GET_POSTS } from "../actions/types";

const initialState = {
  dealer: [],
};

export type Action = { type: string ; payload: string };

export const postReducer = (state : any = initialState, action: Action ) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        dealer: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;