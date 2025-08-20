require 'rails_helper'

RSpec.describe UserSession, type: :model do
  subject { build(:user_session) }

  it { is_expected.to validate_presence_of(:token) }
  it { is_expected.to validate_uniqueness_of(:token) }
  it { is_expected.to validate_presence_of(:device) }
end
