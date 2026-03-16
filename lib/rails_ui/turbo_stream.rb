
module RailsUi
  module TurboStream

    def append_body(content = nil, **rendering, &block)
      template = render_template(nil, content, **rendering, &block)
      turbo_stream_action_tag :append_body, template: template
    end

    def visit(url: @view_context.request.referer)
      turbo_stream_action_tag :visit, url: url
    end

  end
end

ActiveSupport.on_load :turbo_streams_tag_builder do
  include RailsUi::TurboStream
end
