import React from "react";
import { render } from "@testing-library/react";
import YoutubeEmbed from "../../src/components/YoutubeEmbed";

describe("<YoutubeEmbed/>", () => {
  it("should render", () => {
    const screen = render(<YoutubeEmbed videoId="1234" />);

    expect(screen.getByTestId("youtube-embed")).toBeInTheDocument();
  });

  it("should have the correct src attribute", () => {
    const videoId = "dQw4w9WgXcQ";
    const screen = render(<YoutubeEmbed videoId={videoId} />);
    const iframe = screen.getByTestId("youtube-embed");
    expect(iframe).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${videoId}`,
    );
  });

  it("should allow fullscreen", () => {
    const videoId = "dQw4w9WgXcQ";
    const screen = render(<YoutubeEmbed videoId={videoId} />);
    const iframe = screen.getByTestId("youtube-embed");
    expect(iframe).toHaveAttribute("allowFullScreen");
  });

  it("should have the correct title attribute", () => {
    const videoId = "dQw4w9WgXcQ";
    const screen = render(<YoutubeEmbed videoId={videoId} />);
    const iframe = screen.getByTestId("youtube-embed");
    expect(iframe).toHaveAttribute("title", `Youtube video - ${videoId}`);
  });
});
