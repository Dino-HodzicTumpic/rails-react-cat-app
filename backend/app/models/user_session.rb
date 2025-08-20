class UserSession < ApplicationRecord
  belongs_to :user

  validates :token, presence: true, uniqueness: true
  validates :device, presence: true

  has_secure_token
end
