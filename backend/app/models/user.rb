# == Schema Information
#
# Table name: users
#
#  id                   :bigint           not null, primary key
#  sub_id               :string           not null
#  google_id            :string
#  email                :string           not null
#  nickname             :string           not null
#  avatar_key           :string
#  avatar_url           :string
#  view_history         :integer          default([]), is an Array
#  confirmation_token   :string
#  confirmed_at         :datetime
#  confirmation_sent_at :datetime
#  password_digest      :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class User < ApplicationRecord
  before_validation :set_sub_id
  before_validation :generate_confirmation_token
  before_validation :normalize_email, if: :email_changed?
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
