import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  show() {
    const mask = document.createElement('div')
    mask.classList.add('weui-mask-share')
    document.body.appendChild(mask)
    document.body.classList.add('clipped')

    mask.addEventListener(
      'click',
      e => {
        e.currentTarget.remove()
        document.body.classList.remove('clipped')
      }
    )
  }

}