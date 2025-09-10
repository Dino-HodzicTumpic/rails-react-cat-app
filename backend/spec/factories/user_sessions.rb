# == Schema Information
#
# Table name: user_sessions
#
#  id           :bigint           not null, primary key
#  device       :string           not null
#  expires_at   :datetime
#  last_used_at :datetime
#  token        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint
#
# Indexes
#
#  index_user_sessions_on_expires_at  (expires_at)
#  index_user_sessions_on_token       (token) UNIQUE
#  index_user_sessions_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :user_session do
    association :user
    device { 'web' }
    expires_at { 1.week.from_now }
    last_used_at { Time.current }
  end
end
