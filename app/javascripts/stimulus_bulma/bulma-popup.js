import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['popup', 'overlay']

  connect() {
    //document.documentElement.classList.add('clipped')
  }

  close(e) {
    e.currentTarget.remove()
    this.popupTarget.remove()
  }

  open() {
    this.overlayTarget.classList.remove('display-none')
    this.popupTarget.classList.remove('display-none')
  }

  hidden(e) {
    e.currentTarget.classList.add('display-none')
    this.popupTarget.classList.add('display-none')
  }
}
