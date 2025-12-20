module RailsUi #:nodoc:
  mattr_accessor :config, default: ActiveSupport::OrderedOptions.new

  ActiveSupport.on_load(:before_initialize) do
    config.svg_dir = Rails.root.join('public/svgs')
  end
end
