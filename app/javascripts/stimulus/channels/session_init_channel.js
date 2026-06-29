import BaseCable from './base_cable'
import { createConsumer } from '@rails/actioncable/src'

// 专门用于微信扫码登录
export default class extends BaseCable {

  connect() {
    this.subscribe()
  }

  subscribe() {
    const consumer = createConsumer('https://linlishenghuo.com/cable')
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