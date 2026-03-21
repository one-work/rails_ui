import SearchInputController from './search-input'

export default class extends SearchInputController {

  submit(e) {
    const el = e.currentTarget
    for (const input of el.form.elements) {
      if (input.name === el.name && input.type === 'hidden') {
        input.remove()
      } else if (input.name === 'commit') {
        input.disabled = true
      }
    }
    el.form.requestSubmit()
  }

  submitButton(e) {
    e.preventDefault()
    const el = e.currentTarget
    const items = el.dataset.item.split(',')
    console.debug('ITEMS' ,items)

    for (const input of el.form.elements) {
      if (items.includes(input.name) && input.type === 'hidden') {
        console.debug('to delete----', input.name)
        input.disabled = true
      } else {
        console.debug('dddd------------', input.name, input.type)
      }
    }
    this.checkBlank(e)
    el.form.requestSubmit()
  }

  confirm(e) {
    const el = e.currentTarget
    const lteEl = Array.from(el.form.elements).find(i => i.name === 'created_at-gte')
    console.debug(el.value)
    el.blur()

    if (el.type === 'datetime-local' && el.name.endsWith('-lte') && lteEl.value) {
      // 激活确认按钮
      this.checkBlank(e)
      el.form.requestSubmit()
    }
  }

}
