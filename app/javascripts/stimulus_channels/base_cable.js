import { Controller } from '@hotwired/stimulus'
import { createConsumer, getConfig } from '@rails/actioncable/src'

export default class BaseCable extends Controller {
  static consumer = createConsumer(getConfig('url'))

}

window.consumer = BaseCable.consumer