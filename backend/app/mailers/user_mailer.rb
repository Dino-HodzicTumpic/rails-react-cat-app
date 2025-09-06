class UserMailer < ApplicationMailer
  def confirmation_email(user)
    @user = user
    @confirmation_link = "#{ENV['FRONTEND_URL']}/confirm?token=#{user.confirmation_token}"

    mail(
      to: user.email,
      subject: 'Confirm your account',
      body: "Click this link to confirm your account: #{@confirmation_link}"
    )
  end
end
