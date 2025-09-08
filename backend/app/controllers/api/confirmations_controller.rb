module Api
  class ConfirmationsController < ApplicationController
    def create
      service = ConfirmUserService.new(params[:token], params[:device_info])
      result = service.confirm_user

      if result[:success]
        render json: { message: 'Account confirmed', token: result[:token] }, status: :ok
      else
        render json: { error: result[:error] }, status: :unprocessable_entity

      end
    end
  end
end
