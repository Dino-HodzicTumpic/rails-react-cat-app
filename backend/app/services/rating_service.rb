class RatingService
  def self.add_rating(user, cat_api_id, rating_value)
    cat = Cat.find_by(cat_api_id: cat_api_id)
    return { data: { error: 'Cat not found' }, status: :not_found } unless cat

    rating = user.ratings.find_or_initialize_by(cat: cat)
    rating.rating = rating_value
    rating.save!

    { data: { message: 'Rating saved', rating: rating }, status: :created }
  rescue ActiveRecord::RecordInvalid => e
    { data: { error: e.record.errors.full_messages.join(', ') }, status: :unprocessable_entity }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  def self.remove_rating(user, cat_api_id)
    cat = Cat.find_by(cat_api_id: cat_api_id)
    return { data: { error: 'Cat not found' }, status: :not_found } unless cat

    rating = user.ratings.find_by(cat: cat)
    return { data: { error: 'Rating not found' }, status: :not_found } unless rating

    rating.destroy
    { data: { message: 'Rating removed' }, status: :ok }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  def self.get_rating(user, cat_api_id)
    cat = Cat.find_by(cat_api_id: cat_api_id)
    return { data: { error: 'Cat not found' }, status: :not_found } unless cat

    rating = user.ratings.find_by(cat: cat)
    return { data: { error: 'Rating not found' }, status: :not_found } unless rating

    { data: { rating: rating.rating }, status: :ok }
  rescue StandardError => e
    { data: { error: e.message }, status: :bad_request }
  end

  def self.get_average_rating(cat_api_id)
    cat = Cat.find_by(cat_api_id: cat_api_id)
    return { data: { error: 'Cat not found' }, status: :not_found } unless cat

    { data: { average_rating: cat.average_rating }, status: :ok }
  end
end
