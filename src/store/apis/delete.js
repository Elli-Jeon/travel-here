import { dbService } from "firebase.js";

export const commentDelAPI = async(id) => {
  const response = await dbService.collection("comment").where("post_id","==",id).get();
  return response;
}

export const userComDelAPI = async(id) => {
  const response = await dbService.collection("users").where("user_write_comments", "array-contains", id).get();
  return response;
}

export const userLikeDelAPI = async(id) => {
  const response = await dbService.collection("users").where("user_like_posts", "array-contains", id).get();
  return response;
}

export const userBookmarkDelAPI = async(id) => {
  const response = await dbService.collection("users").where("user_bookmark_posts", "array-contains", id).get();
  return response;
}