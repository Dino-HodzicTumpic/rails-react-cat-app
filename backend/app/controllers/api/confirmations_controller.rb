module Api
  class ConfirmationsController < ApplicationController
    def create
      result = ConfirmUserService(params[:token]).confirm_user

      if result[:success]
        render json: { message: 'Account confirmed' }, status: :ok
      else
        render json: { error: result[:error] }, status: :unprocessable_entity

      end
    end
  end
end
