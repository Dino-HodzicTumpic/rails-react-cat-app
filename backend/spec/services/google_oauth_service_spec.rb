require 'rails_helper'

RSpec.describe GoogleOauthService, type: :service do
  let(:valid_payload) do
    {
      'sub' => 'google_123',
      'email' => 'test@gmail.com',
      'name' => 'Test User'
    }
  end

  let(:id_token) { 'fake_google_token' }
  let(:device_info) { 'iPhone Safari' }
  let(:service) { described_class.new(id_token, device_info) }

  before do
    # Mock Google token verification
    allow(Google::Auth::IDTokens).to receive(:verify_oidc)
      .with(id_token, aud: ENV['GOOGLE_CLIENT_ID'])
      .and_return(valid_payload)
  end

  describe '#authenticate' do
    context 'with new Google user' do
      it 'creates new user and session' do
        expect { service.authenticate }.to change(User, :count).by(1)
                                                               .and change(UserSession,
                                                                           :count).by(1)
      end

      it 'returns token and user data' do
        result = service.authenticate

        expect(result[:token]).to be_present
        expect(result[:user][:email]).to eq('test@gmail.com')
        expect(result[:user][:nickname]).to eq('Test User')
      end

      it 'sets Google attributes' do
        result = service.authenticate
        user = result[:user]

        expect(user.google_id).to eq('google_123')
        expect(user.confirmed_at).to be_present
      end
    end

    context 'with existing email user (no Google ID)' do
      let!(:existing_user) do
        create(:user, email: 'test@gmail.com', google_id: nil, password: '123')
      end

      it 'links Google account to existing user' do
        expect { service.authenticate }.not_to change(User, :count)

        existing_user.reload
        expect(existing_user.google_id).to eq('google_123')
      end
    end

    context 'with existing Google user' do
      let(:existing_user) { create(:user, email: 'test@gmail.com', google_id: 'google_123') }

      before do
        existing_user
      end

      it 'does not create new user' do
        expect { service.authenticate }.not_to change(User, :count)
      end

      it 'creates new session' do
        expect { service.authenticate }.to change(UserSession, :count).by(1)
      end
    end

    context 'with invalid token' do
      before do
        allow(Google::Auth::IDTokens).to receive(:verify_oidc)
          .and_raise(Google::Auth::IDTokens::VerificationError)
      end

      it 'raises VerificationError' do
        expect { service.authenticate }.to raise_error(Google::Auth::IDTokens::VerificationError)
      end
    end
  end
end
