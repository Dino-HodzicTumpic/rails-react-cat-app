module Api
  class RegistrationsController < ApplicationController
    def create
      service = RegistrationService.new(params[:email], params[:password], params[:nickname])
      result = service.call

      if result[:success]
        render json: { message: 'confirmation email sent' }, status: :ok
      else
        render json: { error: result[:error] }, status: :unprocessable_entity
      end
    end

    def check_email
      email = params[:email]
      return render json: { error: 'email param missing' }, status: :bad_request if email.blank?

      unless email.match(/\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/)
        return render json: { error: 'email format invalid' }, status: :bad_request
      end

      if User.with_email(email).exists?
        return render json: { error: 'user with that email already exists' }, status: :bad_request
      end

      render json: { message: 'email is valid and available' }, status: :ok
    end
  end
end
