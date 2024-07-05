class Video < ApplicationRecord
  before_save :assign_title
  belongs_to :user

  scope :latest, -> { order(created_at: :desc) }

  def youtube_id
    @youtube_id ||= youtube_parse(link)
  end

  private

  def api_key
    ENV['YOUTUBE_API']
  end

  def assign_title
    video_id = youtube_parse(link)
    return unless video_id

    self.title = get_youtube_title(video_id)
  end

  def get_youtube_title(video_id)
    require 'net/http'

    api_url = "https://www.googleapis.com/youtube/v3/videos?id=#{video_id}&key=#{api_key}&part=snippet"
    uri = URI(api_url)
    response = Net::HTTP.get(uri)
    result = JSON.parse(response)

    begin
      result['items'][0]['snippet']['title'] unless result['items'].empty?
    rescue StandardError
      nil
    end
  end

  def youtube_parse(url)
    reg_exp = %r{^.*((youtu.be/)|(v/)|(/u/\w/)|(embed/)|(watch\?))\??v?=?([^#&?]*).*}
    match = url.match(reg_exp)
    match && match[7].length == 11 ? match[7] : false
  end
end
