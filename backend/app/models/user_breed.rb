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
class UserBreed < ApplicationRecord
  belongs_to :user
  belongs_to :breed
end
