Rails.application.routes.draw do
  namespace :api do
    get 'cats/index'
    get 'cats/update'
    get 'cats/skip-routes'


  end
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
      resources :cats, only: [:index, :update]
      get 'my_cats', to: 'cats#my_cats'

    #API ROUTES SHOULD GO HERE
  end

  #Do not place any routes below this one
  if Rails.env.production?
    get '*other', to: 'static#index'
  end
end
