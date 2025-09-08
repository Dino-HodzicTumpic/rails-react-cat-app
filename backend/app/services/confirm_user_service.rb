class ConfirmUserService
  def initialize(token, device_info)
    @token = token
    @device_info = device_info
    @user = User.find_by(confirmation_token: @token)
  end

  def confirm_user
    return { success: false, error: 'Token invalid' } if @user.nil?
    return { success: false, error: 'User already confirmed' } if @user.confirmed_at.present?
    return { success: false, error: 'Token expired' } if @user.confirmation_sent_at < 24.hours.ago

    @user.update(confirmed_at: Time.current, confirmation_token: nil)

    session = create_session

    { success: true, token: session.token }
  end

  private

  def create_session
    user.user_sessions.create!(device: @device_info,
                               expires_at: 30.days.from_now,
                               last_used_at: Time.current)
  end
end
