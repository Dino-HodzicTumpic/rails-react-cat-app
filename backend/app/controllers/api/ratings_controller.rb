module Api
  class RatingsController < ApplicationController
    before_action :authenticate_request!

    def add_rating
      result = RatingService.add_rating(current_user, params[:cat_id], params[:rating])
      render json: result[:data], status: result[:status]
    end

    def remove_rating
      result = RatingService.remove_rating(current_user, params[:cat_id])
      render json: result[:data], status: result[:status]
    end

    def rating
      result = RatingService.get_rating(current_user, params[:cat_id])
      render json: result[:data], status: result[:status]
    end

    def average_rating
      result = RatingService.get_average_rating(params[:cat_id])
      render json: result[:data], status: result[:status]
    end
  end
end
