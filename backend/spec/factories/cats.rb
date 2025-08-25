# == Schema Information
#
# Table name: cats
#
#  id         :bigint           not null, primary key
#  cat_api_id :string           not null
#  image_key  :string
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :cat do
    sequence(:cat_api_id) { |n| "cat_api_#{n}" }
  end
end
