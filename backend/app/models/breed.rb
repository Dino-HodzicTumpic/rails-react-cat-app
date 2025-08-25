# == Schema Information
#
# Table name: breeds
#
#  id         :bigint           not null, primary key
#  breed_name :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Breed < ApplicationRecord
  has_many :user_breeds, dependent: :destroy
  has_many :users, through: :user_breeds
  validates :breed_name, presence: true, uniqueness: true
end
