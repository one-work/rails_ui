module RailsUi #:nodoc:
  mattr_accessor :config, default: ActiveSupport::OrderedOptions.new

  config.svg_dir = Rails.root.join('public/svgs')
end
