class User < ApplicationRecord
  before_create :set_sub_id
  before_create :generate_confirmation_token
  has_many :user_sessions, dependent: :destroy
  has_many :user_breeds, dependent: :destroy
  has_many :breeds, through: :user_breed

  validates :sub_id, presence: true, uniqueness: true
  validates :google_id, uniqueness: true
  validates :email, uniqueness: { case_sensitive: false },
                    format: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :nickname, presence: true,
                       length: { minimum: 2 }
  validates :confirmation_token, presence: true
  validates :password, presence: true, if: -> { google_id.blank? }

  has_secure_password validations: false

  def set_sub_id
    self.sub_id = SecureRandom.uuid
  end

  def generate_confirmation_token
    self.confirmation_token ||= SecureRandom.hex(10)
  end
end
