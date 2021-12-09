import { combineReducers } from "redux";
import dealerReducer from "./dealerReducer";

export const rootReducer = combineReducers({
  dealerList: dealerReducer,
});

export type RootState = ReturnType<typeof rootReducer>