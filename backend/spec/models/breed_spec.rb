# == Schema Information
#
# Table name: breeds
#
#  id               :bigint           not null, primary key
#  breed_name       :string           not null
#  description      :text
#  featured         :boolean          default(FALSE)
#  life_span        :string
#  origin           :string
#  sample_image_url :string
#  temperament      :string
#  wikipedia_url    :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  cat_api_id       :string
#
# Indexes
#
#  index_breeds_on_breed_name  (breed_name) UNIQUE
#  index_breeds_on_cat_api_id  (cat_api_id) UNIQUE
#  index_breeds_on_featured    (featured)
#
require 'rails_helper'
RSpec.describe Breed, type: :model do
  subject { build(:breed) }

  it { is_expected.to validate_presence_of(:breed_name) }
end
