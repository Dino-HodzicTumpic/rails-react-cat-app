# == Schema Information
#
# Table name: users
#
#  id                   :bigint           not null, primary key
#  sub_id               :string           not null
#  google_id            :string
#  email                :string           not null
#  nickname             :string           not null
#  avatar_key           :string
#  avatar_url           :string
#  view_history         :integer          default([]), is an Array
#  confirmation_token   :string
#  confirmed_at         :datetime
#  confirmation_sent_at :datetime
#  password_digest      :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
FactoryBot.define do
  factory :user do
    sub_id { SecureRandom.uuid }
    email { Faker::Internet.unique.email }
    nickname { Faker::Name.name }
    password_digest { BCrypt::Password.create('password123') }
    confirmation_token { SecureRandom.hex(10) }
  end
end
