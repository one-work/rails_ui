Turbo.StreamActions.visit = function() {
  const url = this.getAttribute('url')
  const action = this.getAttribute('turbo_action')
  console.debug('-------', action)

  if (action) {
    Turbo.visit(url || this.baseURI, { action: action })
  } else {
    Turbo.visit(url || this.baseURI)
  }
}

Turbo.StreamActions.append_body = function() {
  const element = this.ownerDocument.body
  element.append(this.templateContent)
}
