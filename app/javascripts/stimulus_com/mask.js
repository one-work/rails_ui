import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  show() {
    const mask = document.createElement('div')
    mask.classList.add('weui-mask-share')
    document.body.appendChild(mask)

    mask.addEventListener(
      'click',
      e => {
        e.currentTarget.remove()
      }
    )
  }

}