  Rails.application.routes.draw do

  
    # NOTE: This was modified to include 'nested routing' so I can access specific concert_tickets with specific foods:
      resources :concert_tickets do
        resources :bands 
      resources :users
    end
    
    # Login related routes:
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    get "/find_shows/:bandname", to: "concert_tickets#find_shows"
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  end 