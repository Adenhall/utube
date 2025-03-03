require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(email: 'USER@EXAMPLE.COM', password: 'password', password_confirmation: 'password')
  end

  test 'email should be downcased before saving' do
    @user.save
    assert_equal 'user@example.com', @user.reload.email
  end

  test 'should be valid with valid attributes' do
    assert @user.valid?
  end

  test 'email should be present' do
    @user.email = '     '
    assert_not @user.valid?
  end

  test 'email should be valid format' do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test 'email should be invalid format' do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test 'email should be unique' do
    duplicate_user = @user.dup
    @user.save
    duplicate_user.email = @user.email # Downcased
    assert_not duplicate_user.valid?
  end

  test 'email should be saved as lower-case' do
    mixed_case_email = 'Foo@ExAMPle.CoM'
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test 'password should be present' do
    @user.password = @user.password_confirmation = ' ' * 6
    assert_not @user.valid?
  end

  test 'password should have a minimum length' do
    @user.password = @user.password_confirmation = 'a' * 5
    assert_not @user.valid?
  end

  test 'password and password_confirmation should match' do
    @user.password_confirmation = 'different'
    assert_not @user.valid?
  end
end
