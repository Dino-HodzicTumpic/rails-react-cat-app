FactoryBot.define do
  factory :user_breed do
    association :user
    association :breed
  end
end
