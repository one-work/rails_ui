import BaseCable from './base_cable'

// 专门用于微信扫码登录
export default class extends BaseCable {

  connect() {
    this.subscribe()
  }

  subscribe() {
    const urlParams = new URLSearchParams(location.search)

    this.subscription = BaseCable.consumer.subscriptions.create(
      {
        channel: 'Wechat::SessionChannel',
        state: urlParams.get('state')
      },
      {
        received(data) {
          document.getElementById('login_qrcode').src = data.data_url

          const countDown = document.getElementById('login_count_down')
          countDown.getController('count-down').resetCounter('', data.remaining)
          countDown.classList.remove('display-none')
        },

        connected() {
          this.appear()
        },

        appear() {
          this.perform('appear', { appearing_on: 'ddddd' })
        }
     }
    )
  }

  disconnect() {
    this.subscription.unsubscribe()
  }
}