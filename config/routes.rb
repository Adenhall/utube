Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'client#index'

  # Serve the frontend through the root path
  get '*path', to: 'client#index', constraints: ->(req) { req.format.html? }

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  namespace :api do
    namespace :auth do
      post '/login', to: 'auth#login'
      post '/signup', to: 'auth#signup'
    end
  end
end
