require 'test_helper'

class NotificationsChannelTest < ActionCable::Channel::TestCase
  test 'subscribes to stream' do
    subscribe

    assert subscription.confirmed?
    assert_has_stream 'NotificationsChannel'
  end

  test 'unsubscribes from stream' do
    subscribe

    assert subscription.confirmed?
    assert_has_stream 'NotificationsChannel'

    unsubscribe
    assert_no_streams
  end

  test 'broadcasts to the channel' do
    subscribe

    assert_broadcasts 'NotificationsChannel', 0
    ActionCable.server.broadcast 'NotificationsChannel', { message: 'Hello, world!' }
    assert_broadcasts 'NotificationsChannel', 1
  end
end
