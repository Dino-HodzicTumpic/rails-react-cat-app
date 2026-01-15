# == Schema Information
#
# Table name: ratings
#
#  id         :bigint           not null, primary key
#  rating     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  cat_id     :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_ratings_on_cat_id   (cat_id)
#  index_ratings_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (cat_id => cats.id)
#  fk_rails_...  (user_id => users.id)
#
class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :cat

  validates :rating, presence: true, inclusion: { in: 1..10 }
end
