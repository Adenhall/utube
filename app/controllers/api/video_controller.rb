class Api::VideoController < ApplicationController
  before_action :authorize

  def list
    videos = Video.latest.offset(params[:page].to_i * 5).limit(5).map do |video|
      youtube_id = video.youtube_id
      data = video.as_json(only: %i[id link title created_at])
      data[:youtube_id] = youtube_id
      data
    end

    render json: { videos: }, status: :ok
  end

  def share
    Video.create!(link: params[:url], user_id: current_user.id)
  end
end
