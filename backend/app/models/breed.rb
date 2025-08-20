class Breed < ApplicationRecord
  has_many :user_breeds, dependent: :destroy
  has_many :users, through: :user_breeds
  validates :breed_name, presence: true, uniqueness: true
end
