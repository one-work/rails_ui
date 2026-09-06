import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    title: String,
    desc: String,
    link: String,
    content: String,
    image: String
  }

  connect() {
    this.updateTimeline()
    this.updateShare()
  }

  updateTimeline() {
    let content = this.titleValue
    if (this.hasContentValue) {
      content = this.contentValue
    }

    wx.updateTimelineShareData({
      title: content,
      link: this.linkValue,
      imgUrl: this.imageValue,
      success: (res) => {
        //alert(JSON.stringify(res))
      },
      fail: (err) => {
        //alert(JSON.stringify(err))
      }
    })
  }

  updateShare() {
    wx.updateAppMessageShareData({
      title: this.titleValue,
      desc: this.descValue,
      link: this.linkValue,
      imgUrl: this.imageValue,
      success: (res) => {
        //alert(JSON.stringify(res))
      },
      fail: (err) => {
        //alert(JSON.stringify(err))
      }
    })
  }

}
