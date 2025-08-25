# == Schema Information
#
# Table name: user_sessions
#
#  id           :bigint           not null, primary key
#  token        :string           not null
#  device       :string           not null
#  expires_at   :datetime
#  last_used_at :datetime
#  user_id      :bigint
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class UserSession < ApplicationRecord
  belongs_to :user

  validates :token, presence: true, uniqueness: true
  validates :device, presence: true

  has_secure_token
end
