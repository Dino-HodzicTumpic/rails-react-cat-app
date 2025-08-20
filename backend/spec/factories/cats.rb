FactoryBot.define do
  factory :cat do
    sequence(:cat_api_id) { |n| "cat_api_#{n}" }
  end
end
