import { useState } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";

import { listVideos, Video } from "../services/video";

import YoutubeEmbed from "../components/YoutubeEmbed";
import InfiniteScroll from "react-infinite-scroll-component";

export const loader: LoaderFunction = async () => {
  const res = await listVideos();

  return res.data.videos;
};

const VideoList = () => {
  const videos = useLoaderData() as Video[];
  const [data, setData] = useState(videos);
  const [hasMore, setHasMore] = useState(videos.length === 5);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    const newPage = page + 1;
    const res = await listVideos(newPage);

    setData([...data, ...res.data.videos]);
    setHasMore(res.data.videos.length === 5);
    setPage(newPage);
  };

  return (
    <div id="scrollableDiv" className="py-20 px-6 lg:px-44 overflow-scroll">
      <InfiniteScroll
        className="flex flex-col space-y-6"
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {data.map((video) => (
          <div key={video.id} className="space-x-6 flex flex-col lg:flex-row">
            <YoutubeEmbed videoId={video.youtube_id} />
            <h1>{video.title}</h1>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VideoList;
