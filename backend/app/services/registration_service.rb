class RegistrationService
  def initialize(email, password, nickname)
    @email = email
    @password = password
    @nickname = nickname
  end

  def call
    return { success: false, error: 'email invalid' } unless validates_email?
    return { success: false, error: 'password invalid' } unless validates_password?
    return { success: false, error: 'nickname invalid' } unless validates_nickname?

    create_user
    send_confirmation_mail
    { success: true }
  rescue ActiveRecord::RecordInvalid, StandardError => e
    fail(e.message)
  end

  private

  def create_user
    @user = User.create!(
      email: @email,
      password: @password,
      password_confirmation: @password,
      nickname: @nickname
    )
  end

  def send_confirmation_mail
    UserMailer.confirmation_email(@user).deliver_now!
  rescue StandardError => e
    Rails.logger.error "Failed to send confirmation email to #{@user.email}: #{e.message}"
    raise "Failed to send confirmation email: #{e.message}"
  end

  def validates_email?
    return false if @email.blank?

    return false unless @email.match(/\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/)

    return false if User.with_email(@email).exists?

    true
  end

  def validates_password?
    return false if @password.length < 6

    return false unless @password.match(/\A.*[A-Za-z].*\z/)

    return false unless @password.match(/\A.*([0-9]|[^A-Za-z0-9]).*\z/)

    true
  end

  def validates_nickname?
    return false if @nickname.blank?

    true
  end

  def fail(message)
    { success: false, error: message }
  end
end
