import { Controller } from '@hotwired/stimulus'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const UNITS = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
const FORMATS = ['Y年', 'M月', 'D天', 'H时', 'mm分', 'ss秒']

export default class extends Controller {
  static values = {
    time: String,
    diff: { type: Array, default: UNITS }
  }

  connect() {
    this.count()
  }

  disconnect() {
    clearInterval(this.timer)
  }

  count() {
    const time = dayjs(this.timeValue)
    const now = dayjs()
    const countingDown = time.isAfter(now)
    let rest = dayjs.duration(Math.abs(time.diff(now)))

    const units = UNITS.filter((u) => this.diffValue.includes(u))
    const formats = FORMATS.filter((_, i) => this.diffValue.includes(UNITS[i]))

    const render = () => {
      const values = units.map((unit) => rest[unit]())
      // 找到第一个非零单位，从那里开始格式化（对应原代码的 format.slice(index)）
      const start = values.findIndex((v) => v !== 0)
      const pattern = formats.slice(start === -1 ? formats.length - 1 : start).join('')
      this.element.textContent = rest.format(pattern)
    }

    render()

    this.timer = setInterval(() => {
      rest = countingDown ? rest.subtract(1, 'second') : rest.add(1, 'second')
      render()

      if (countingDown && rest.asSeconds() <= 0) {
        clearInterval(this.timer) // 倒计时到 0 停止
      }
    }, 1000)
  }
}
