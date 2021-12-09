import {GET_DEALERS} from "./types";
import {IDealerData} from "../Interfaces/IDealerDetails";

export const getDealers = (data:IDealerData) => {
  return {
    type: GET_DEALERS,
    payload: data,
  }

};
