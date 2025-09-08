class LoginService
  def initialize(email, password, device_info)
    @email = email
    @password = password
    @device_info = device_info
    @user = nil
  end

  def call
    return { success: false } unless user_exists?
    return { success: false } unless authenticate_user

    # ako su provjere prosle onda kreiraj session i vrati token i usera
    session = create_session
    { success: true, user: @user, token: session.token }
  end

  private

  def user_exists?
    @user = User.with_email(@email).first
    @user.present?
  end

  def authenticate_user
    @user.authenticate(@password)
  end

  def create_session
    @user.user_sessions.create!(device: @device_info,
                                expires_at: 30.days.from_now,
                                last_used_at: Time.current)
  end
end
