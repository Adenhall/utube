class Api::VideoController < ApplicationController
  before_action :authorize!

  def share
    Video.create!(link: params[:link], user_id: current_user)
  end
end
