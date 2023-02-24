  Rails.application.routes.draw do
    # CRUD: CREATE READ UPDATE DELETE
    # RAILS VERSION OF CRUD --> SHUD: SHOW INDEX UPDATE DELETE
    
    # Optionally, we can limit the CRUD methods we allow:
    # resources :cookouts, only: [:index, :create]
  
    # NOTE: By just using 'resources :cookouts' we can then allow for ALL CRUD methods so that I can also allow a 'show' route
  
    # PREVIOUS ROUTE DECLARATION VIA 'resources' MACRO:
    # resources :cookouts
  
    # NOTE: This is what is provided by the 'resources' macro from Rails:
    # This is the ':index' route provided by the 'resources' macro:
    # get "/cookouts", to: "cookouts#index"
    # This is the ':create' route provided by the 'resources' macro:
    # post "/cookouts", to: "cookouts#create"
  
    # WHAT THIS MEANS FOR THE FRONTEND:
    # To create cookouts: On the frontend, I need to make a frontend 'post' request for '/cookouts'
    # To get cookouts: On the frontend, I need to make a frontend 'get' request for '/cookouts':
  
    # What I had previously before I decided everything should be CRUD compatible:
    # resources :foods, only: [:index, :create]
  
    # PREVIOUS ROUTE DECLARATION VIA 'resources' MACRO:
    # resources :foods
  
    # NOTE: This was modified to include 'nested routing' so I can access specific cookouts with specific foods:
      resources :concert_tickets
      resources :bands
      resources :users
    end
  
    # Custom:
  
    # Login related routes:
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
    
