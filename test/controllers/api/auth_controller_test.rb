require 'test_helper'

class Api::AuthControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(
      email: 'user@example.com',
      password: 'password'
    )
  end

  test 'should login with valid credentials' do
    post api_signin_url, params: { email: @user.email, password: @user.password }
    assert_response :ok
    assert_equal @user.id.to_s, session[:user_id]

    response_data = JSON.parse(response.body)
    assert_equal @user.email, response_data['email']
  end

  test 'should signup with new email' do
    assert_difference('User.count') do
      post api_signin_url, params: { email: 'new_user@example.com', password: 'password' }
    end

    assert_response :created
    assert_not_nil session[:user_id]

    new_user = User.find_by(email: 'new_user@example.com')
    assert new_user

    response_data = JSON.parse(response.body)
    assert_equal 'new_user@example.com', response_data['email']
  end

  test 'should not login with invalid password' do
    post api_signin_url, params: { email: @user.email, password: 'wrong_password' }
    assert_response :unauthorized
    assert_nil session[:user_id]
  end

  test 'should not signup with invalid email' do
    assert_no_difference('User.count') do
      post api_signin_url, params: { email: 'invalid_email', password: 'password' }
    end

    assert_response :unprocessable_entity
  end

  test 'should logout' do
    login_user(@user)
    post api_logout_url
    assert_response :no_content
    assert_nil session[:user_id]
  end

  test 'should ping and return current user' do
    login_user(@user)
    get api_ping_url
    assert_response :ok

    response_data = JSON.parse(response.body)
    assert_equal @user.email, response_data['email']
  end

  private

  def login_user(user)
    post api_signin_url, params: { email: user.email, password: @user.password }
  end
end
