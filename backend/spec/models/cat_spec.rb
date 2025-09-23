# == Schema Information
#
# Table name: cats
#
#  id                   :bigint           not null, primary key
#  image_key            :string
#  image_url            :string
#  name                 :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  cat_api_id           :string           not null
#  cloudinary_public_id :string
#
# Indexes
#
#  index_cats_on_cat_api_id  (cat_api_id) UNIQUE
#
require 'rails_helper'
RSpec.describe Cat, type: :model do
  subject { build(:cat) }

  it { is_expected.to validate_presence_of(:cat_api_id) }
  it { is_expected.to validate_uniqueness_of(:cat_api_id) }
end
