module Api
  class UsersController < ApplicationController
    before_action :authenticate_request!

    def me
      render json: UserService.profile(current_user), status: :ok
    end
  end
end
