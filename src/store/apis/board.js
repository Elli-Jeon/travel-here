import { dbService } from "firebase.js";

export const getPostListAPI = async (region) => {
  const response = await dbService.collection("post").where("post_region","==",region).get()

  return response;
};

// onSnapShot이 실시간 업데이트 된다던데.. => 굳이 그럴 필요가 있을까?? onSnapShot()은 async await 사용 불가
