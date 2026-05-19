class UserService
  def self.profile(user)
    {
      user: {
        email: user.email,
        nickname: user.nickname,
        avatar_url: user.avatar_url
      }
    }
  end
end
