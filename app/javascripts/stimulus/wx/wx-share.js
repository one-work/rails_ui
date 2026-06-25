import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['preview', 'media']
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
    this.showMenu()
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
      fail: () => {
        alert('分享到朋友圈')
      }
    })
  }

  updateShare() {
    wx.updateAppMessageShareData({
      title: this.titleValue,
      desc: this.descValue,
      link: this.linkValue,
      imgUrl: this.imageValue,
      fail: () => {
        alert('转发给朋友')
      }
    })
  }

  // 实际测试不能正常工作，文档未说明
  showMenu() {
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:appMessage',
        'share:timeline',
        'profile'
      ]
    })
    //wx.showOptionMenu()
  }

}
