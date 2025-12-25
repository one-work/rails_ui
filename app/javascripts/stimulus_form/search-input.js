import BaseController from '../base_controller'

export default class extends BaseController {
  static targets = ['input', 'content']
  static values = {
    url: String
  }

  connect() {
    if (this.hasInputTarget) {
      this.initInput(this.inputTarget)
    }
  }

  initInput(ele) {
    ele.addEventListener('input', this.submit)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.submit)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.submit)
      if (this.hasUrlValue) {
        this.inputPost(ele)
      } else {
        ele.form.requestSubmit()
      }
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

  cancel(e) {
    const ele = e.currentTarget
    if (ele.value.length === 0 && ele.defaultValue.length > 0) {
      for (let el of ele.form.elements) {
        if (el.value) {
        } else {
          el.disabled = true
        }
      }
      ele.form.requestSubmit()
    }
  }

}
