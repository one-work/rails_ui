import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    input: String
  }

  select(e) {
    const selected = e.currentTarget

    const origin = document.getElementById(this.idValue)
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = origin.name
    input.value = selected.dataset.value

    origin.parentElement.insertBefore(input, origin)
    selected.closest('#modal')?.remove()

    const con = origin.closest('[data-controller~=picture]').getController('picture')
    con.previewUrl(selected.dataset.url)
  }

}
