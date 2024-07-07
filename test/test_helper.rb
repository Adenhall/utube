ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'minitest/autorun'
require 'rake'

# Load the Rake application
load File.expand_path('../Rakefile', __dir__)
Rails.application.load_tasks

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    Rake::Task['db:reset'].invoke
    # Add more helper methods to be used by all tests here...
  end
end

module AuthHelper
  def login_as(user)
    post api_signin_url, params: { email: user.email, password: user.password }
  end
end
