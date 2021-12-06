import {GET_POSTS} from "./types";
import axios from "axios";

// get all posts
export const getPosts = (id : any) => async (values : any) => {

  const result = await axios.get(`http://vehicledoctor.us-east-2.elasticbeanstalk.com/dealer/serviceType/${id}`);
  values({
    type: GET_POSTS,
    payload: result.data,
  });
};
