import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'filename', 'preview', 'upload', 'icon']



  removePreview(e) {
    const valueInput = this.element.querySelector('input[type=hidden]')
    if (valueInput) {
      valueInput.remove()
    }

    const fileInput = this.element.querySelector('input[type=file]')
    if (fileInput) {
      fileInput.disabled = false
    }

    const wrap = e.currentTarget.parentNode
    wrap.remove()
  }


}
