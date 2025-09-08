module Api
  class LoginsController < ApplicationController
    def create
      service = LoginService.new(params[:email], params[:password], params[:device_info])
      result = service.call

      if result[:success]
        render json: { token: result[:token], user: result[:user].as_json(only: [:email, :nickname]) }, # rubocop:disable Layout/LineLength
               status: :ok
      else
        render json: { error: 'email or password invalid' }, status: :unauthorized
      end
    end
  end
end
