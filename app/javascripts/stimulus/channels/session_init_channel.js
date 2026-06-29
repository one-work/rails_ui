import BaseCable from './base_cable'
import { createConsumer } from '@rails/actioncable/src'

// 专门用于微信扫码登录
export default class extends BaseCable {
  static values = {
    url: String
  }

  connect() {
    this.subscribe()
  }

  subscribe() {
    let consumer
    if (this.hasUrlValue) {
      consumer = createConsumer(this.urlValue)
    } else {
      consumer = BaseCable.consumer
    }

    const urlParams = new URLSearchParams(location.search)
    this.subscription = consumer.subscriptions.create(
      {
        channel: 'Wechat::SessionInitChannel',
        state: urlParams.get('state')
      }
    )
  }

  disconnect() {
    this.subscription.unsubscribe()
  }
}