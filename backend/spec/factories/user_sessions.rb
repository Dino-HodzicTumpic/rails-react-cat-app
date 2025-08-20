FactoryBot.define do
  factory :user_session do
    association :user
    device { 'web' }
    expires_at { 1.week.from_now }
    last_used_at { Time.current }
  end
end
