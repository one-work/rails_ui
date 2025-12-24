import BaseController from '../base_controller'

export default class extends BaseController {
  static targets = ['input', 'content']
  static values = {
    url: String,
    auto: { type: Boolean, default: false }
  }

  connect() {
    if (this.autoValue) {
      this.initInput()
    }
  }

  initInput() {
    const ele = this.inputTarget
    ele.addEventListener('input', this.submit)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.submit)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.submit)
      this.conForm(ele)
    })
  }

  // NOTICE  here this becomes ele, who call addEventListener
  submit() {
    const con = this.closest('[data-controller~=search-input]').getController('search-input')

    if (con.hasUrlValue) {
      con.inputPost(this)
    } else {
      this.form.requestSubmit()
    }
  }

  cancel() {
    if (this.inputTarget.value.length === 0) {
      Turbo.visit(location.pathname, { action: 'replace' })
    }
  }

  conForm(ele) {
    if (this.hasUrlValue) {
      this.inputPost(ele)
    } else {
      ele.form.requestSubmit()
    }
  }

}
