require 'test_helper'
require 'net/http'

class VideoTest < ActiveSupport::TestCase
  setup do
    @user = User.new(
      email: 'USER@EXAMPLE.COM',
      password: 'password',
      password_confirmation: 'password'
    )

    @video = Video.new(link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', user: @user)
  end

  test 'should belong to user' do
    assert @video.respond_to?(:user)
  end

  test 'should validate youtube_id' do
    assert_equal 'dQw4w9WgXcQ', @video.youtube_id
  end

  test 'should get latest videos' do
    video1 = Video.create!(link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', user: @user, created_at: 1.day.ago)
    video2 = Video.create!(link: 'https://www.youtube.com/watch?v=abcd1234', user: @user, created_at: 1.hour.ago)
    latest_videos = Video.latest
    assert_equal [video2, video1], latest_videos.to_a
  end

  test 'should assign title before save' do
    video = Video.new(link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', user: @user)
    video.stub :get_youtube_title, 'Test Title' do
      video.save
      assert_equal 'Test Title', video.title
    end
  end

  test 'should handle invalid youtube URL' do
    video = Video.new(link: 'https://www.youtube.com/watch?v=invalid', user: @user)
    assert_nil video.youtube_id
  end

  test 'should handle empty youtube title from API' do
    video = Video.new(link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', user: @user)
    video.stub :get_youtube_title, nil do
      video.save
      assert_nil video.title
    end
  end

  test 'should call youtube_parse on valid URL' do
    video1 = Video.new(link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', user: @user)
    video2 = Video.new(link: 'https://www.fakeyoutube.com/watch?v=abcd1234', user: @user)
    assert video1.youtube_id
    assert_nil video2.youtube_id
  end
end
