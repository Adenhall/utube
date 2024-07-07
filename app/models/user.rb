class User < ApplicationRecord
  include ActiveModel::SecurePassword
  has_secure_password

  before_save :downcase_email

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  private

  def downcase_email
    self.email = email.downcase
  end
end
