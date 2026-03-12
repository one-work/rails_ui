import '@hotwired/turbo-rails'
import './events'

Turbo.StreamActions.visit = function() {
  const url = this.getAttribute('url')

  Turbo.visit(url)
}

Turbo.StreamActions.append_body = function() {
  const element = this.ownerDocument.body
  element.append(this.templateContent)
}
