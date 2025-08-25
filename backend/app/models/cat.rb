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
class Cat < ApplicationRecord
  validates :cat_api_id, presence: true, uniqueness: true
end
