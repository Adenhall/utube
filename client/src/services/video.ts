import axios from "axios";

export const shareVideo = (url: string) => {
  return axios.post("/api/share_video", { url });
};
