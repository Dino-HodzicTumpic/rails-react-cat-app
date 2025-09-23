class ApplicationController < ActionController::API
  def authenticate_request! # rubocop:disable Metrics/MethodLength
    token = request.headers['Authorization']&.split(' ')&.last
    return render json: { error: 'Not authenticated' }, status: :unauthorized unless token

    session = UserSession.find_by(token: token)
    return render json: { error: 'Not authenticated' }, status: :unauthorized unless session

    if session.expires_at < Time.current
      return render json: { error: 'Expired session' },
                    status: :unauthorized
    end

    session.touch(:last_used_at) # rubocop:disable Rails/SkipsModelValidations

    @current_user = session.user
    render json: { error: 'User not found' }, status: :unauthorized unless @current_user
  end

  private

  attr_reader :current_user
end
