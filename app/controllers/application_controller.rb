class ApplicationController < ActionController::API
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorize
    render json: { error: 'Not authorized' }, status: :unauthorized unless current_user
  end
end
