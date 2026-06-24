import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String, // url must begin with /pages
    data: Object,
    direct: Boolean,
    launch: Boolean,
    nav: Boolean,
    debug: Boolean
  }

  connect() {

  }
}
