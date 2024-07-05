import { LoaderFunction, useLoaderData } from "react-router-dom";

import { listVideos, Video } from "../services/video";

import YoutubeEmbed from "../components/YoutubeEmbed";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  try {
    const res = await listVideos(Number(page) || 0);

    return res.data.videos || [];
  } catch {
    // TODO: Add visibility
  }

  return [];
};

const VideoList = () => {
  const videos = useLoaderData() as Video[];
  return (
    <div className="mx-auto mt-20 px-6 space-y-6">
      {videos.map((video) => (
        <div key={video.id} className="space-x-6 lg:flex">
          <YoutubeEmbed videoId={video.youtube_id} />
          <h1>{video.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
