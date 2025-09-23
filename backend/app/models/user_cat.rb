# == Schema Information
#
# Table name: user_cats
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  cat_id     :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_cats_on_cat_id              (cat_id)
#  index_user_cats_on_user_id             (user_id)
#  index_user_cats_on_user_id_and_cat_id  (user_id,cat_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (cat_id => cats.id)
#  fk_rails_...  (user_id => users.id)
#
class UserCat < ApplicationRecord
  belongs_to :user
  belongs_to :cat
end
