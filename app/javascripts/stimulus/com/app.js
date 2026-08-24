import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    const url = new URL(location.href)
    if (url.searchParams.has('auth_token')) {
      url.searchParams.delete('auth_token')
      Turbo.visit(url, { action: 'replace' })
    }
  }

}
