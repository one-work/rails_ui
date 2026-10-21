import ProgramController from '../program_controller'

export default class extends ProgramController {
  static targets = ['show', 'hidden']

  connect() {
    if (this.directValue) {
      this.navTo()
    }
  }

  noticeUrl() {
    tt.miniProgram.postMessage({
      data: {
        url: this.urlValue
      }
    })
  }

  navTo() {
    const url = this.getUrl()
    tt.miniProgram.redirectTo({
      url: url,
      success: res => {
        this.directValue = false
        if (this.hasHiddenTarget) {
          this.hiddenTarget.style.display = 'none'
        }
        if (this.hasShowTarget) {
          this.showTarget.style.display = 'block'
        }
      }
    })
  }
}
