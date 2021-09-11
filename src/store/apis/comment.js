import { dbService } from "firebase.js";

export const getCommentAPI = async(id) => {
  const response = await dbService.collection("comment").where("post_id","==",id).get();
  return response;
}

export const getMypageCommentAPI = async(id) => {
  const response = await dbService.collection("comment").where("comment_id","==",id).get();
  return response;
}

export const editMypageAPI = async(id) => {
  const response = await dbService.collection("comment").where("user_uid","==",id).get();
  return response;
}