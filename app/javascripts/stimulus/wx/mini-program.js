import ProgramController from '../program_controller'

export default class extends ProgramController {
  static targets = ['show', 'hidden']

  connect() {
    if (window.__wxjs_environment === 'miniprogram') {
      if (this.directValue) {
        this.navTo()
      }
    }
  }

  link() {
    wx.miniProgram.getEnv(res => {
      console.debug('mini program env:', res)
      if (res.miniprogram) {
        this.navTo()
      }
    })
  }

  navTo() {
    let url = this.xx()

    if (this.launchValue) {
      wx.miniProgram.reLaunch({ url: url })
    } else {
      wx.miniProgram.navigateTo({
        url: url,
        success: (res) => {
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

}
