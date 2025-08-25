# == Schema Information
#
# Table name: breeds
#
#  id         :bigint           not null, primary key
#  breed_name :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'
RSpec.describe Breed, type: :model do
  subject { build(:breed) }

  it { is_expected.to validate_presence_of(:breed_name) }
end
