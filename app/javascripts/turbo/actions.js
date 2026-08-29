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
  const exec = this.getAttribute('exec')

  this.targetElements.forEach(targetElement => {
    Object.entries(this.dataset).forEach(([key, value]) => {
      targetElement.dataset[`${controller}-${key}-value`] = value
    })
    const con = application.getControllerForElementAndIdentifier(targetElement, controller)
    con[exec]()
  })
}
