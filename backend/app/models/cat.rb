class Cat < ApplicationRecord
  validates :cat_api_id, presence: true, uniqueness: true
end
