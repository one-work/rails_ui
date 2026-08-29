Turbo.StreamActions.visit = function() {
  const url = this.getAttribute('url')
  const action = this.getAttribute('turbo_action')

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

Turbo.StreamActions.stimulus = function() {
  const controller = this.getAttribute('controller')
  const action = this.getAttribute('action')

  this.targetElements.forEach(targetElement => {
    const con = application.getControllerForElementAndIdentifier(targetElement, controller)
    Object.entries(this.dataset).forEach(([key, value]) => {
      con[`${key}Value`] = value
    })
    con[action]()
  })
}
