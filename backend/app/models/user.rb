# == Schema Information
#
# Table name: users
#
#  id                   :bigint           not null, primary key
#  avatar_url           :string
#  confirmation_sent_at :datetime
#  confirmation_token   :string
#  confirmed_at         :datetime
#  email                :string           not null
#  nickname             :string           not null
#  password_digest      :string
#  view_history         :integer          default([]), is an Array
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  avatar_public_id     :string
#  google_id            :string
#  sub_id               :string           not null
#
# Indexes
#
#  index_users_on_confirmation_token  (confirmation_token) UNIQUE
#  index_users_on_email               (email) UNIQUE
#  index_users_on_google_id           (google_id) UNIQUE
#  index_users_on_sub_id              (sub_id) UNIQUE
#
class User < ApplicationRecord
  before_validation :set_sub_id
  before_validation :generate_confirmation_token
  before_validation :normalize_email, if: :email_changed?
  has_many :user_sessions, dependent: :destroy
  has_many :user_breeds, dependent: :destroy
  has_many :breeds, through: :user_breeds
  has_many :user_cats, dependent: :destroy
  has_many :cats, through: :user_cats

  validates :sub_id, presence: true, uniqueness: true
  validates :google_id, uniqueness: true
  validates :email, uniqueness: { case_sensitive: false },
                    format: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :nickname, presence: true
  validates :confirmation_token, presence: true
  validates :password, presence: true, if: -> { google_id.blank? }

  has_secure_password validations: false

  scope :with_email, ->(email) { where(email: normalize_email(email)) }

  def set_sub_id
    self.sub_id = SecureRandom.uuid
  end

  def generate_confirmation_token
    self.confirmation_token ||= SecureRandom.hex(10)
  end

  def self.normalize_email(email)
    email.to_s.downcase.strip
  end

  private

  def normalize_email
    self.email = self.class.normalize_email(email)
  end
end
