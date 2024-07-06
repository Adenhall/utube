class Api::VideoController < ApplicationController
  before_action :authorize, except: :list

  def list
    return render json: { videos: [] }, status: :ok unless current_user

    videos = Video.latest.offset(params[:page].to_i * 5).limit(5).map { |video| video_attributes(video) }

    render json: { videos: }, status: :ok
  end

  def share
    Video.create!(link: params[:url], user_id: current_user.id)
  end

  private

  def video_attributes(video)
    video.as_json(only: %i[id link title created_at]).merge(youtube_id: video.youtube_id)
  end
end
