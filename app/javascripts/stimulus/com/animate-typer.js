import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item']

  connect() {
    const ele = this.element
    ele.classList.remove('invisible')
    const charCount = Math.max(1, ele.innerText.length)
    ele.style.animationDuration = `${charCount * 200}ms`
    ele.style.animationTimingFunction = `steps(${charCount}, end)`
    ele.classList.add('has-animate-typer')
    ele.addEventListener('animationend', this.typeNext, { once: true })
  }

  typeNext(event) {
    const ele = event.currentTarget
    let nextEle = ele.nextElementSibling
    while (nextEle) {
      if (nextEle.innerHTML) {
        nextEle.dataset.add('controller', 'animate-typer')
        break
      } else {
        nextEle = nextEle.nextElementSibling
      }
    }
  }

}
