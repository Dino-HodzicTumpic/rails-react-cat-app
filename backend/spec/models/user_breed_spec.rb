require 'rails_helper'
RSpec.describe UserBreed, type: :model do
  subject { build(:user_breed) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:breed) }
end
