import { Controller } from '@hotwired/stimulus'
import { createConsumer } from '@rails/actioncable/src'

export default class BaseCable extends Controller {

  static consumer = createConsumer('/rails/cable')

}

window.consumer = BaseCable.consumer