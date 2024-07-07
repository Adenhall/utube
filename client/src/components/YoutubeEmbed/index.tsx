type Props = {
  videoId: string;
};

const YoutubeEmbed = ({ videoId }: Props) => (
  <div className="h-96 lg:h-fit">
    <iframe
      data-testid="youtube-embed"
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={`Youtube video - ${videoId}`}
    />
  </div>
);

export default YoutubeEmbed;
