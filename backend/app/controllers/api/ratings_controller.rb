module Api
  class RatingsController < ApplicationController
    before_action :authenticate_request!

    def create
      result = RatingService.add_rating(current_user, params[:cat_id], params[:rating],
                                        params[:cat_name], params[:image_url], params[:breed_id])
      render json: result[:data], status: result[:status]
    end

    def destroy
      result = RatingService.remove_rating(current_user, params[:cat_id])
      render json: result[:data], status: result[:status]
    end

    def index
      result = RatingService.get_rating(current_user, params[:cat_id])
      render json: result[:data], status: result[:status]
    end

    def average_rating
      result = RatingService.get_average_rating(params[:cat_id])
      render json: result[:data], status: result[:status]
    end
  end
end
