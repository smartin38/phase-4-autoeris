Rails.application.routes.draw do
  resources :notes
  resources :favorites
  resources :users, only: [:index, :create]
  
  post "/users", to: "user#create"
  post "/login", to: "auth#login"
  get "/auth_login", to: "auth#auth_login"
  get "/user_is_authed", to: "auth#user_is_authed"
end
