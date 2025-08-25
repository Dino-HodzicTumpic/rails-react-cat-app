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
require 'rails_helper'
RSpec.describe UserBreed, type: :model do
  subject { build(:user_breed) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:breed) }
end
