require 'test_helper'

class ClientControllerTest < ActionDispatch::IntegrationTest
  test 'should get index and render index.html' do
    get root_url
    assert_response :success

    assert_includes response.body, '<!DOCTYPE html>'
    assert_includes response.body, '<head>'
    assert_includes response.body, '<body>'
  end
end
