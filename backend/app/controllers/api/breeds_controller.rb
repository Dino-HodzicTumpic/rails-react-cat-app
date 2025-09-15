module Api
  class BreedsController < ApplicationController
    # ovo vjv nece trebat
    def index; end

    # detalji odredenog breeda
    def show
      breed = Breed.find(params[:id])

      breed_images = CatApiService.fetch_breed_images(breed.cat_api_id)
      render json: { breed_info: breed.slice(:id, :breed_name, :description, :sample_image_url, :temperament, # rubocop:disable Layout/LineLength
                                             :affection_level, :grooming, :life_span, :intelligence,
                                             :child_friendly, :dog_friendly, :social_needs, :vocalisation, # rubocop:disable Layout/LineLength
                                             :alt_names, :origin), breed_images: breed_images }, status: :ok # rubocop:disable Layout/LineLength
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Breed not found' }, status: :not_found
    end

    # vraca featured breedove
    def featured
      ft_breeds = Breed.featured.select(:id, :breed_name, :description, :sample_image_url)
      render json: { ft_breeds: ft_breeds }, status: :ok
    end
  end
end
