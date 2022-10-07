Rails.application.routes.draw do
  resources :notes, only: [:index, :show, :user_favorites, :create, :update, :destroy]
  resources :favorites, only: [:index, :show, :user_favorites, :create, :update, :destroy]
  resources :users, only: [:index, :show, :login, :create, :destroy]
  
  
  post "/users", to: "users#create"
  post "/login", to: "users#login"
  get "/login", to: "users#login"
  get "/favorites", to: "favorites#index"
  post "/favorites", to: "favorites#create"
  get "/notes", to: "notes#index"
  post "/notes", to: "notes#create"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"
end
