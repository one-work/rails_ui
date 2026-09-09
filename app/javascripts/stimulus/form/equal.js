import { Controller } from '@hotwired/stimulus'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export default class extends Controller {
  static targets = ['goal']
  static values = {
    plus: Object
  }

  update(event) {
    const ele = event.currentTarget

    if (parseFloat(ele.value) > parseFloat(this.goalTarget.value)) {
      this.goalTarget.value = ele.value
    }
  }

  updateTime(event) {
    const ele = event.currentTarget
    const dt = dayjs(ele.value).add(dayjs.duration(this.plusValue)).format('YYYY-MM-DD[T]HH:mm:ss')
    if (this.goalTarget.value === this.goalTarget.defaultValue) {
      this.goalTarget.value = dt
    }
  }

}
