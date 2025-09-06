class ConfirmUserService
  def initialize(token)
    @token = token
    @user = User.find_by(confirmation_token: @token)
  end

  def confirm_user
    return { success: false, error: 'Token invalid' } if @user.nil?
    return { success: false, error: 'User already confirmed' } if @user.confirmed_at.present?
    return { success: false, error: 'Token expired' } if @user.confirmation_sent_at < 24.hours.ago

    @user.update(confirmed_at: Time.current, confirmation_token: nil)
    { success: true }
  end
end
