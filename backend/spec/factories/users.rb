FactoryBot.define do
  factory :user do
    sub_id { SecureRandom.uuid }
    email { Faker::Internet.unique.email }
    nickname { Faker::Name.name }
    password_digest { BCrypt::Password.create('password123') }
    confirmation_token { SecureRandom.hex(10) }
  end
end
