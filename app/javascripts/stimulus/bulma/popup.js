import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [
    'popup',
    'menu',
    'overlay'
  ]

  connect() {
    //document.documentElement.classList.add('clipped')
  }

  popupTargetConnected(target) {
    this.menuTarget.classList.add('display-none')
    this.overlayTarget.classList.add('display-none')
  }

  close(e) {
    e.currentTarget.remove()
    this.popupTarget.remove()
  }

  open() {
    this.overlayTarget.classList.remove('display-none')
    this.menuTarget.classList.remove('display-none')
  }

  hidden(e) {
    e.currentTarget.classList.add('display-none')
    this.menuTarget.classList.add('display-none')
  }
}
