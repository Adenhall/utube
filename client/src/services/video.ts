import axios from "axios";

export type Video = {
  id: string;
  title: string;
  link: string;
  youtube_id: string;
};

export const shareVideo = (url: string) => {
  return axios.post("/api/share_video", { url });
};

export const listVideos = (page = 0) => {
  return axios.get<{ videos: Video[] }>("/api/list_videos", {
    params: { page },
  });
};
