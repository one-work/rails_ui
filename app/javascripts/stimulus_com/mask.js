import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  close() {
    const ele = this.element
    ele.classList.add('display-none')
  }

  show() {
    const ele = this.element
    ele.classList.remove('display-none')
  }

  toggle() {
    const x = this.element
    if (x.classList.contains('weui-mask-share')) {
      x.classList.remove('weui-mask-share')
    } else {
      x.classList.add('weui-mask-share')
    }
  }

}