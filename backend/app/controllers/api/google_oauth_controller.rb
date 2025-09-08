require 'googleauth'
module Api
  class GoogleOauthController < ApplicationController
    def authenticate
      result = GoogleOauthService.new(params[:id_token], params[:device_info]).authenticate
      render json: { token: result[:token], user: result[:user].as_json(only: [:email, :nickname]) }, # rubocop:disable Layout/LineLength
             status: :ok
    rescue Google::Auth::IDTokens::VerificationError
      render json: { error: 'Authentication failed' }, status: :unauthorized
    end
  end
end
