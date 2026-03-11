import '@hotwired/turbo-rails'
import './events'
import './override'

Turbo.StreamActions.visit = function() {
  const url = this.getAttribute('url')

  Turbo.visit(url)
}
