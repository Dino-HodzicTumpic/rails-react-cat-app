class CatImageUploadJob < ApplicationJob
  queue_as :default

  def perform(cat_id, image_url)
    cat = Cat.find(cat_id)
    cat.upload_image_from_url(image_url)
  rescue StandardError => e
    Rails.logger.error "Failed to upload image for cat #{cat_id}: #{e.message}"
  end
end
