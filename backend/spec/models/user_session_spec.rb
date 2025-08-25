# == Schema Information
#
# Table name: user_sessions
#
#  id           :bigint           not null, primary key
#  token        :string           not null
#  device       :string           not null
#  expires_at   :datetime
#  last_used_at :datetime
#  user_id      :bigint
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'rails_helper'

RSpec.describe UserSession, type: :model do
  subject { build(:user_session) }

  it { is_expected.to validate_presence_of(:token) }
  it { is_expected.to validate_uniqueness_of(:token) }
  it { is_expected.to validate_presence_of(:device) }
end
