Rails.app.routes.draw do

  namespace :ui, defaults: { business: 'ui' } do

    controller :home do
      get '/' => :index
      get :swipe
    end

  end

end
