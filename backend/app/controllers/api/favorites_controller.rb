module Api
  class FavoritesController < ApplicationController
    before_action :authenticate_request!

    def index; end

    def add_breed; end

    def remove_breed; end

    def add_cat
      cat_data = cat_params
      result = FavoriteService.add_cat(current_user, cat_data)
      render json: result[:data], status: result[:status]
    end

    def remove_cat
      result = FavoriteService.remove_cat(current_user, cat_params[:cat_api_id])
      render json: result[:data], status: result[:status]
    end
  end

  private

  def cat_params
    params.require(:cat).permit(:cat_api_id, :image_url)
  end
end
