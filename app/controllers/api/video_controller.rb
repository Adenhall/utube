class Api::VideoController < ApplicationController
  before_action :authorize

  def share
    Video.create!(link: params[:url], user_id: current_user.id)
  end
end
