Turbo.StreamActions.visit = function() {
  const url = this.getAttribute('url')

  Turbo.visit(url || this.baseURI)
}

Turbo.StreamActions.append_body = function() {
  const element = this.ownerDocument.body
  element.append(this.templateContent)
}
