# == Schema Information
#
# Table name: users
#
#  id                   :bigint           not null, primary key
#  avatar_url           :string
#  confirmation_sent_at :datetime
#  confirmation_token   :string
#  confirmed_at         :datetime
#  email                :string           not null
#  nickname             :string           not null
#  password_digest      :string
#  view_history         :integer          default([]), is an Array
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  avatar_public_id     :string
#  google_id            :string
#  sub_id               :string           not null
#
# Indexes
#
#  index_users_on_confirmation_token  (confirmation_token) UNIQUE
#  index_users_on_email               (email) UNIQUE
#  index_users_on_google_id           (google_id) UNIQUE
#  index_users_on_sub_id              (sub_id) UNIQUE
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
