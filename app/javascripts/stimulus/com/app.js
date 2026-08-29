import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    const url = new URL(location.href)
    url.searchParams.delete('auth_token')
    history.replaceState(history.state, '', url.toString())
  }

}
