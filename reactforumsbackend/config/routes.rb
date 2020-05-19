Rails.application.routes.draw do
  namespace 'api' do
    resources :posts
    resources :topics
    get 'users', :to => 'users#index'
    post 'users', :to => 'users#create'
    post 'users/login', :to => 'users#login'
    post 'users/validate', :to => 'users#validate'
  end
end
