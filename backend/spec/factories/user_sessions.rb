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
FactoryBot.define do
  factory :user_session do
    association :user
    device { 'web' }
    expires_at { 1.week.from_now }
    last_used_at { Time.current }
  end
end
