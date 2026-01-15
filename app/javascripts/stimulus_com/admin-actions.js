import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    action: { type: String, default: 'template_admin_actions' },
    data: { type: Object, default: {} }
  }

  connect() {
    const templateAction = document.getElementById(this.actionValue)
    Object.entries(this.dataValue).forEach(([i, v]) => {
      const item = document.getElementById(i)
      const fragment = templateAction.content.cloneNode(true)
      const form = fragment.querySelector('form')
      form.action = `/org/admin/shortcuts/${v}`

      item.replaceWith(fragment)
    })

    this.element.removeAttribute('data-admin-actions-data-value')
  }

}