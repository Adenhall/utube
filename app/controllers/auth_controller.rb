class AuthController < ApplicationController
  def login
    user = User.find_by!(email: params[:email]).authenticate(params[:password])

    user.empty?
  end

  def signup
    User.create!(email: params[:email], password: params[:password])
  end
end
