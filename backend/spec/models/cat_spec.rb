require 'rails_helper'
RSpec.describe Cat, type: :model do
  subject { build(:cat) }

  it { is_expected.to validate_presence_of(:cat_api_id) }
  it { is_expected.to validate_uniqueness_of(:cat_api_id) }
end
