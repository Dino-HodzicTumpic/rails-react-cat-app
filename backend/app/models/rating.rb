class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :cat

  validates :rating, presence: true, inclusion: { in: 1..10 }
end
