require 'rails_helper'
RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to validate_presence_of(:sub_id) }
  it { is_expected.to validate_uniqueness_of(:sub_id) }
  it { is_expected.to validate_uniqueness_of(:google_id) }
  it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  it { is_expected.to validate_presence_of(:nickname) }
  it { is_expected.to validate_length_of(:nickname).is_at_least(2) }
  it { is_expected.to validate_presence_of(:confirmation_token) }

  describe 'email format validation' do
    it { is_expected.not_to allow_value('invalid-email').for(:email) }
    it { is_expected.not_to allow_value('test@').for(:email) }
    it { is_expected.not_to allow_value('@example.com').for(:email) }
    it { is_expected.to allow_value('test@example.com').for(:email) }
    it { is_expected.to allow_value('user.name@domain.co.uk').for(:email) }
  end

  describe 'password_digest validation' do
    it 'validates presence of passsword_digest if google_id is blank(nil)' do
      user = build(:user, google_id: nil, password: nil)
      expect(user).not_to be_valid
    end

    it 'does not validate presence of password_digest if google_id is present' do
      user = build(:user, google_id: '1234', password: nil)
      expect(user).to be_valid
    end
  end
end
