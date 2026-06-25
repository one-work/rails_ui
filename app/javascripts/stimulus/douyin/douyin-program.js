import ProgramController from '../program_controller'

export default class extends ProgramController {

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
    const url = this.xx()

    tt.miniProgram.redirectTo({ url: url })
  }
}
