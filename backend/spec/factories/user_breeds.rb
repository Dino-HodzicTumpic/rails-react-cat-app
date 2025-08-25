# == Schema Information
#
# Table name: user_breeds
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  breed_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :user_breed do
    association :user
    association :breed
  end
end
