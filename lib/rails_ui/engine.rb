module RailsUi
  class Engine < ::Rails::Engine

    initializer 'rails_ui.assets' do |app|
      app.config.assets.paths += [
        root.join('app/assets/stylesheets')
      ]
    end

  end
end
