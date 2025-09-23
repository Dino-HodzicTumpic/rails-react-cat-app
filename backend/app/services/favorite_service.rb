class FavoriteService
  def self.add_breed(user, breed_id); end

  def self.remove_breed(user, breed_id); end

  def self.add_cat(user, cat_api_id, image_url)
    cat = user.cats.find_or_initialize_by(cat_api_id: cat_api_id)
    cat.upload_image_from_url(image_url)
    { data: { message: 'Cat added to favorites', cat: cat }, status: :created }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  def self.remove_cat(user, cat_api_id)
    user_cat = user.user_cats.find_by(cat_api_id: cat_api_id)

    if user_cat&.destroy
      { data: { message: 'Cat removed' }, status: :ok }
    else
      { data: { error: 'Favorite not found' }, status: :not_found }
    end
  end

  def self.get_user_favorites(user); end
end
