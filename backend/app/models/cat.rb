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
class Cat < ApplicationRecord
  validates :cat_api_id, presence: true, uniqueness: true
  validates :cloudinary_public_id, presence: true

  has_many :users, through: :user_cats

  def image_url
    self[:image_url] || Cloudinary::Utils.cloudinary_url(cloudinary_public_id)
  end

  def upload_image_from_url(source_url) # rubocop:disable Metrics/MethodLength
    return false if source_url.blank?

    begin
      result = Cloudinary::Uploader.upload(
        source_url,
        {
          folder: 'cats',
          public_id: "cat_#{cat_api_id}",
          transformation: [
            { width: 800, height: 600, crop: 'scale', quality: 'auto' }
          ],
          tags: ['cat', 'api_image']
        }
      )

      update!(
        cloudinary_public_id: result['public_id'],
        image_url: result['secure_url']
      )

      true
    rescue Cloudinary::Api::Error => e
      Rails.logger.error "Cloudinary upload failed for cat #{cat_api_id}: #{e.message}"
      false
    rescue StandardError => e
      Rails.logger.error "Unexpected error during Cloudinary upload for cat #{cat_api_id}: #{e.message}"
      false
    end
  end
end
