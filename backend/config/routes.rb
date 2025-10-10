Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    resources :registrations, only: :create do
      collection do
        post 'check_email'
      end
    end

    resources :confirmations, only: :create
    resources :logins, only: :create

    post 'google_oauth/authenticate', to: 'google_oauth#authenticate'

    resources :breeds, only: [:index] do
      collection do
        get :featured
      end

      member do
        get :details
        get :images
      end
    end

    resources :favorites, only: [:index] do
      collection do
      post 'breeds/:breed_id', action: :add_breed
      delete 'breeds/:breed_id', action: :remove_breed
      post 'cats/:cat_id', action: :add_cat
      delete 'cats/:cat_id', action: :remove_cat
      get 'breeds', action: :breeds
      get 'cats', action: :cats
      end
    end
  end
end
