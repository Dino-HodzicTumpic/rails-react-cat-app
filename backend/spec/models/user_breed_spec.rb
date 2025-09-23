# == Schema Information
#
# Table name: user_breeds
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  breed_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_breeds_on_breed_id              (breed_id)
#  index_user_breeds_on_user_id               (user_id)
#  index_user_breeds_on_user_id_and_breed_id  (user_id,breed_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (breed_id => breeds.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'
RSpec.describe UserBreed, type: :model do
  subject { build(:user_breed) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:breed) }
end
