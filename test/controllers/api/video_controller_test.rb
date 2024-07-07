require 'test_helper'

class Api::VideoControllerTest < ActionDispatch::IntegrationTest
  include AuthHelper

  setup do
    @user = User.create(email: 'john.doe@example.com', password: 'johnpassword')
    @other_user = User.create(email: 'nick.doe@example.com', password: 'nickpassword')
    @video = Video.create(link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', user: @user)
    @new_video_url = 'https://www.youtube.com/watch?v=iAx6m9WgXbL'
  end

  test 'should list videos for logged in user' do
    login_as(@user)

    get api_list_videos_url, params: { page: 0 }
    assert_response :ok

    response_data = JSON.parse(response.body)
    assert_equal 1, response_data['videos'].size
    assert_equal @video.link, response_data['videos'].first['link']
  end

  test 'should return empty list for not logged in user' do
    get api_list_videos_url, params: { page: 0 }
    assert_response :ok

    response_data = JSON.parse(response.body)
    assert_equal [], response_data['videos']
  end

  test 'should list videos with pagination' do
    login_as(@user)

    get api_list_videos_url, params: { page: 1 }
    assert_response :ok

    response_data = JSON.parse(response.body)
    assert_equal 0, response_data['videos'].size
  end

  test 'should share video for logged in user' do
    login_as(@user)

    assert_difference('Video.count') do
      post api_share_video_url, params: { url: @new_video_url }
    end

    assert_response :created
    new_video = Video.find_by(link: @new_video_url)
    assert new_video
    assert_equal @user.id, new_video.user_id
  end

  test 'should not share video for not logged in user' do
    assert_no_difference('Video.count') do
      post api_share_video_url, params: { url: @new_video_url }
      assert_response :unauthorized
    end
  end
end
