# == Schema Information
#
# Table name: breeds
#
#  id                     :bigint           not null, primary key
#  adaptability           :integer
#  affection_level        :integer
#  alt_names              :string
#  breed_name             :string           not null
#  child_friendly         :integer
#  description            :text
#  dog_friendly           :integer
#  energy_level           :integer
#  experimental           :boolean          default(FALSE)
#  featured               :boolean          default(FALSE)
#  grooming               :integer
#  hairless               :boolean          default(FALSE)
#  health_issues          :integer
#  hypoallergenic         :boolean          default(FALSE)
#  indoor                 :boolean          default(FALSE)
#  intelligence           :integer
#  lap                    :boolean          default(FALSE)
#  life_span              :string
#  natural                :boolean          default(FALSE)
#  origin                 :string
#  rare                   :boolean          default(FALSE)
#  rex                    :boolean          default(FALSE)
#  sample_image_url       :string
#  shedding_level         :integer
#  short_legs             :boolean          default(FALSE)
#  social_needs           :integer
#  stranger_friendly      :integer
#  suppressed_tail        :boolean          default(FALSE)
#  temperament            :string
#  vocalisation           :integer
#  wikipedia_url          :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  cat_api_id             :string
#  sample_image_public_id :string
#
# Indexes
#
#  index_breeds_on_breed_name  (breed_name) UNIQUE
#  index_breeds_on_cat_api_id  (cat_api_id) UNIQUE
#  index_breeds_on_featured    (featured)
#
CAT_BREEDS = ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx', 'Ragdoll']

FactoryBot.define do
  factory :breed do
    breed_name { CAT_BREEDS.sample }
  end
end
