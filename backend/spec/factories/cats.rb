# == Schema Information
#
# Table name: cats
#
#  id                   :bigint           not null, primary key
#  image_key            :string
#  image_url            :string
#  name                 :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  cat_api_id           :string           not null
#  cloudinary_public_id :string
#
# Indexes
#
#  index_cats_on_cat_api_id  (cat_api_id) UNIQUE
#
FactoryBot.define do
  factory :cat do
    sequence(:cat_api_id) { |n| "cat_api_#{n}" }
    cloudinary_public_id { |n| "public_id_#{n}" }
  end
end
