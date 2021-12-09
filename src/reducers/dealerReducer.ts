import {GET_DEALERS} from "../actions/types";

const initialState = {
  dealer: [],
};

export type Action = { type: string ; payload: string };

export const dealerReducer = (state : any = initialState, action: Action ) => {

  switch (action.type) {
    case GET_DEALERS:
      return {
        ...state,
        dealer: action.payload,
      };
    default:
      return state;
  }
};

export default dealerReducer;