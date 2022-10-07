Rails.application.routes.draw do
  resources :notes, only: [:index, :show, :user_favorites, :create, :update, :destroy]
  resources :favorites, only: [:index, :show, :user_favorites, :create, :update, :destroy]
  resources :users, only: [:index, :show, :login, :create, :destroy]
  
  post "/users", to: "user#create"
  post "/login", to: "user#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"
end
