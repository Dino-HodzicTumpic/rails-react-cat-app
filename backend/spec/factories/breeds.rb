CAT_BREEDS = ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx', 'Ragdoll']

FactoryBot.define do
  factory :breed do
    breed_name { CAT_BREEDS.sample }
  end
end
