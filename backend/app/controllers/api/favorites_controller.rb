module Api
  class FavoritesController < ApplicationController
    before_action :authenticate_request!

    # vraca sve favorite breedove i macke
    def index; end

    def breeds
      favorite_breeds = FavoriteService.get_user_favorite_breeds(current_user)
      render json: { favorite_breeds: favorite_breeds }, status: :ok
    rescue StandardError => e
      Rails.logger.error "FavoritesController breeds error: #{e.message}"
      render json: { error: e.message }, status: :bad_request
    end

    def cats
      result = FavoriteService.get_user_favorite_cats(current_user)
      render json: result[:data], status: result[:status]
    end

    def add_breed
      result = FavoriteService.add_breed(current_user, params[:breed_id])
      render json: result[:data], status: result[:status]
    end

    def remove_breed
      result = FavoriteService.remove_breed(current_user, params[:breed_id])
      render json: result[:data], status: result[:status]
    end

    def add_cat
      result = FavoriteService.add_cat(current_user, params[:cat_id], cat_params[:image_url],
                                       cat_params[:name], cat_params[:breed_id])
      render json: result[:data], status: result[:status]
    end

    def remove_cat
      result = FavoriteService.remove_cat(current_user, params[:cat_id])
      render json: result[:data], status: result[:status]
    end

    def cats_with_ratings
      favorite_cats = FavoriteService.get_user_favorite_cats_with_ratings(current_user)
      render json: { favorite_cats: favorite_cats }, status: :ok
    rescue StandardError => e
      Rails.logger.error "FavoritesController cats_with_ratings error: #{e.message}"
      render json: { error: e.message }, status: :bad_request
    end

    private

    def cat_params
      params.require(:cat).permit(:image_url, :name, :breed_id)
    end

    def breed_params
      params.require(:breed).permit(:breed_id)
    end
  end
end
