import { Controller } from '@hotwired/stimulus'

// data-controller="animate-typer" 加在包裹层上，子元素用 data-animate-typer-target="item" 标记
// 每个 item 依次完成打字机展示，停留一段时间后切换到下一个，循环滚动
export default class extends Controller {
  static targets = ['item']
  static values = {
    interval: { type: Number, default: 300 },  // 每个字的打字间隔（ms）
    hold: { type: Number, default: 2000 }      // 打字完成后的停留时间（ms）
  }

  connect() {
    this.index = 0
    this.type(this.itemTargets[this.index])
  }

  disconnect() {
    clearTimeout(this.timer)
  }

  type(item) {
    const charCount = Math.max(1, item.textContent.trim().length)
    item.style.animationDuration = `${charCount * this.intervalValue}ms`
    item.style.animationTimingFunction = `steps(${charCount}, end)`
    item.classList.remove('display-none')
    item.classList.add('has-animate-typer')
    item.addEventListener('animationend', () => this.holdThenNext(item), { once: true })
  }

  holdThenNext(item) {
    this.timer = setTimeout(() => {
      item.classList.remove('has-animate-typer')
      item.classList.add('display-none')
      this.index = (this.index + 1) % this.itemTargets.length
      this.type(this.itemTargets[this.index])
    }, this.holdValue)
  }

}
