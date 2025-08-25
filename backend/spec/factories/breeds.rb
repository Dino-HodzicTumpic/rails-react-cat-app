# == Schema Information
#
# Table name: breeds
#
#  id         :bigint           not null, primary key
#  breed_name :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
CAT_BREEDS = ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx', 'Ragdoll']

FactoryBot.define do
  factory :breed do
    breed_name { CAT_BREEDS.sample }
  end
end
