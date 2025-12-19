class FavoriteService
  def self.add_breed(user, breed_id)
    breed = Breed.find_by(id: breed_id)
    return { data: { message: 'Breed not found' }, status: :not_found } unless breed

    user.user_breeds.find_or_create_by!(breed: breed)
    { data: { message: 'Breed added to favorites' }, status: :ok }
  rescue ActiveRecord::RecordInvalid => e
    { data: { error: e.record.errors.full_messages.join(', ') }, status: :unprocessable_entity }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  def self.remove_breed(user, breed_id)
    user_breed = user.user_breeds.find_by(breed_id: breed_id)
    return { data: { error: 'Favorite not found' }, status: :not_found } unless user_breed

    user_breed.destroy
    { data: { message: 'Breed removed from favorites' }, status: :ok }
  rescue ActiveRecord::RecordInvalid => e
    { data: { error: "Invalid record: #{e.record.errors.full_messages.join(', ')}" },
      status: :unprocessable_entity }
  rescue StandardError => e
    { data: { error: "Unexpected error: #{e.message}" }, status: :bad_request }
  end

  def self.add_cat(user, cat_api_id, image_url, name) # rubocop:disable Metrics/MethodLength
    cat = Cat.find_or_initialize_by(cat_api_id: cat_api_id)
    cat.name = name if name.present?
    cat.save! if cat.new_record?

    user.user_cats.find_or_create_by!(cat: cat)

    # Upload slike SAMO ako još nema Cloudinary URL-a
    if cat.cloudinary_public_id.blank?
      # upload slike u background jobu
      CatImageUploadJob.perform_later(cat.id, image_url)
    end

    { data: { message: 'Cat added to favorites', cat: cat }, status: :created }
  rescue ActiveRecord::RecordInvalid => e
    { data: { error: e.record.errors.full_messages.join(', ') }, status: :unprocessable_entity }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  def self.remove_cat(user, cat_api_id)
    cat = Cat.find_by(cat_api_id: cat_api_id)
    return { data: { error: 'Cat not found' }, status: :not_found } unless cat

    user_cat = user.user_cats.find_by(cat_id: cat.id)
    return { data: { error: 'Favorite not found' }, status: :not_found } unless user_cat

    user_cat.destroy
    { data: { message: 'Cat removed from favorites' }, status: :ok }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  # return all favorites (cats + breeds)
  def self.get_user_favorites(user); end

  def self.get_user_favorite_cats(user)
    cats = user.cats
    { data: { cats: cats }, status: :ok }
  end

  def self.get_user_favorite_breeds(user)
    breeds = user.breeds
    { data: { breeds: breeds }, status: :ok }
  end
end
