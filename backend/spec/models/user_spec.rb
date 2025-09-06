# == Schema Information
#
# Table name: users
#
#  id                   :bigint           not null, primary key
#  sub_id               :string           not null
#  google_id            :string
#  email                :string           not null
#  nickname             :string           not null
#  avatar_url           :string
#  view_history         :integer          default([]), is an Array
#  confirmation_token   :string
#  confirmed_at         :datetime
#  confirmation_sent_at :datetime
#  password_digest      :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  avatar_public_id     :string
#
require 'rails_helper'
RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to validate_uniqueness_of(:google_id) }
  it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  it { is_expected.to validate_presence_of(:nickname) }

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
