module Api
  class FavoritesController < ApplicationController
    before_action :authenticate_request!

    def index; end

    def add_breed; end

    def remove_breed; end

    def add_cat
      result = FavoriteService.add_cat(current_user, params[:cat_id], cat_params[:image_url])
      render json: result[:data], status: result[:status]
    end

    def remove_cat
      result = FavoriteService.remove_cat(current_user, params[:cat_id])
      render json: result[:data], status: result[:status]
    end

    private

    def cat_params
      params.require(:cat).permit(:image_url)
    end
  end
end
