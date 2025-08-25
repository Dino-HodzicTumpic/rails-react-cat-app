require 'googleauth'

class GoogleOauthService
  def initialize(id_token, device_info)
    @id_token = id_token
    @device_info = device_info
  end

  def authenticate
    payload = verify_token
    user = find_or_create_user(payload)
    session = create_session(user)

    { token: session.token, user: user }
  end

  private

  def verify_token
    Google::Auth::IDTokens.verify_oidc(@id_token,
                                       aud: ENV['GOOGLE_CLIENT_ID'])
  end

  def find_or_create_user(payload)
    user = User.find_or_initialize_by(email: payload['email'])
    if user.new_record?
      assign_google_attributes(user, payload) # novi Google korisnik
    elsif user.google_id.blank?
      link_google_to_existing_user(user, payload) # spoji sa postojećim
    end
    user
  end

  def assign_google_attributes(user, payload)
    user.google_id = payload['sub']
    user.email = payload['email']
    user.nickname = payload['name']
    user.confirmed_at = Time.current
    user.save!
    # TODO: SLIKE
  end

  def create_session(user)
    user.user_sessions.create!(device: @device_info,
                               expires_at: 30.days.from_now,
                               last_used_at: Time.current)
  end

  def link_google_to_existing_user(user, payload)
    user.google_id = payload['sub']
    user.confirmed_at = Time.current if user.confirmed_at.blank?
    user.save!
  end
end
