Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resource :user,  only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messarges, only: [:index, :create]
  end
end
