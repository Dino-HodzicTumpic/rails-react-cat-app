require 'rails_helper'
RSpec.describe Breed, type: :model do
  subject { build(:breed) }

  it { is_expected.to validate_presence_of(:breed_name) }
end
