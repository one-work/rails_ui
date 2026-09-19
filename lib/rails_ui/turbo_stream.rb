
module RailsUi
  module TurboStream

    def append_body(content = nil, **rendering, &block)
      template = render_template(nil, content, **rendering, &block)
      turbo_stream_action_tag :append_body, template: template
    end

    def visit(url: @view_context.request.referer, action: 'advance', **params)
      if params.present?
        url = URI(url)
        url.query = params.to_query
      end
      turbo_stream_action_tag :visit, url: url.to_s, turbo_action: action
    end

    def stimulus(target, controller:, action:, **dataset)
      turbo_stream_action_tag :stimulus, target: target, controller: controller, exec: action, **dataset
    end

    def enable(target)
      turbo_stream_action_tag :enable, target: target
    end

    def enable_all(targets)
      turbo_stream_action_tag :enable, targets: targets
    end

  end
end

ActiveSupport.on_load :turbo_streams_tag_builder do
  include RailsUi::TurboStream
end
