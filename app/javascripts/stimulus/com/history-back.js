import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = { url: String }

  connect() {
    if (Turbo.session.history.currentIndex === 0) {
      if (this.element.classList.contains('is-link')) {
        this.element.classList.remove('is-link')
      } else if (this.element.children.length && this.element.children[0].tagName === 'svg') {
        this.element.children[0].remove()
      }
    }

    this.element.addEventListener('click', () => {
      if (history.length > 1) {
        history.back()
      } else if (this.hasUrlValue) {
        Turbo.visit(this.urlValue, { action: 'replace' })
      }
    })

    this.element.dataset.remove('controller', this.identifier) // 非常重要，解决 morph 更新问题
  }

}
