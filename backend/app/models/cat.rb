# == Schema Information
#
# Table name: cats
#
#  id                   :bigint           not null, primary key
#  image_key            :string
#  image_url            :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  cat_api_id           :string           not null
#  cloudinary_public_id :string           not null
#
# Indexes
#
#  index_cats_on_cat_api_id  (cat_api_id) UNIQUE
#
class Cat < ApplicationRecord
  validates :cat_api_id, presence: true, uniqueness: true
  validates :cloudinary_public_id, presence: true

  def image_url
    self[:image_url] || Cloudinary::Utils.cloudinary_url(cloudinary_public_id)
  end
end
