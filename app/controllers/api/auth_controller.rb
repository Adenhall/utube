class Api::AuthController < ApplicationController
  def login
    user = User.find_by(email: params[:email].downcase)

    return signup if user.nil?

    if user&.authenticate(params[:password])
      session[:user_id] = user.id.to_s

      render json: user, status: :ok
    else
      render status: :unauthorized
    end
  end

  def signup
    user = User.new(email: params[:email], password: params[:password])

    user.save!

    session[:user_id] = user.id.to_s

    render json: user, status: :created
  end

  def logout
    session.delete(:user_id)
  end

  def ping
    render json: current_user.as_json(except: [:password_digest]), status: :ok
  end
end
