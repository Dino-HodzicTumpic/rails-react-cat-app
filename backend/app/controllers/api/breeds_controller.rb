module Api
  class BreedsController < ApplicationController
    # ovo vjv nece trebat
    def index; end

    def images
      breed = Breed.find(params[:id])
      user = current_user_optional
      breed_images = CatApiService.fetch_breed_images(breed.cat_api_id, user)
      render json: { breed_images: breed_images }, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Breed not found' }, status: :not_found
    end

    def details
      breed = Breed.find(params[:id])
      render json: { breed_info: breed.slice(:id, :breed_name, :description, :sample_image_url, :temperament, # rubocop:disable Layout/LineLength
                                             :affection_level, :grooming, :life_span, :intelligence,
                                             :child_friendly, :dog_friendly, :social_needs, :vocalisation, # rubocop:disable Layout/LineLength
                                             :stranger_friendly, :energy_level,
                                             :health_issues, :alt_names, :origin) }, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Breed not found' },
             status: :not_found
    end

    # vraca featured breedove
    def featured
      ft_breeds = Breed.featured.select(:id, :breed_name, :description, :sample_image_url)
      render json: { ft_breeds: ft_breeds }, status: :ok
    end
  end
end
