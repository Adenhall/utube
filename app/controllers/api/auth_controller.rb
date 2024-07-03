class Api::AuthController < ApplicationController
  def login
    user = User.find_by!(email: params[:email].downcase)

    if user&.authenticate(params[:password])
      # Save the user.id in that user's session cookie:
      session[:user_id] = user.id.to_s
    else
      render status: :unauthorized
    end
  end

  def signup
    user = User.new(email: params[:email], password: params[:password])

    user.save!
  end

  def logout
    session.delete(:user_id)
  end
end
