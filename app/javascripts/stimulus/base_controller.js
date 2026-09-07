import { Controller } from '@hotwired/stimulus'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static values = {
    url: String,
    input: String,
    params: Object
  }

  get(url) {
    this.request(url, 'GET')
  }

  post(url, body = '', headers = {}) {
    this.request(
      url,
      'POST',
      body,
      { ...headers }
    )
  }

  patch(url, body, headers) {
    this.request(
      url,
      'PATCH',
      body,
      { ...headers }
    )
  }

  formPost(form) {
    this.request(
      this.urlValue,
      'POST',
      new FormData(form),
      {}
    )
  }

  inputPost(input) {
    const body = new FormData()
    let url
    if (input.dataset.url) {
      url = new URL(input.dataset.url, location.origin)
    } else {
      url = new URL(this.urlValue, location.origin)
    }

    if (this.hasInputValue) {
      body.append(this.inputValue, input.value)
    } else {
      body.append(input.name, input.value)
    }

    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        body.append(k, this.paramsValue[k])
      })
    }

    this.request(
      url,
      'POST',
      body,
      {}
    )
  }

  inputGet(input) {
    let url
    if (input.dataset.url) {
      url = new URL(input.dataset.url, location.origin)
    } else {
      url = new URL(this.urlValue, location.origin)
    }

    if (this.hasInputValue) {
      url.searchParams.set(this.inputValue, input.value)
    } else {
      url.searchParams.set(input.name, input.value)
    }

    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        url.searchParams.set(k, this.paramsValue[k])
      })
    }

    this.get(url)
  }

  async request(url, method, body, headers) {
    const request = new FetchRequest(
      method,
      url,
      {
        body: body,
        headers: headers,
        responseKind: 'turbo-stream'
      }
    )
    await request.perform()
  }

  get locale() {
    return document.querySelector('html').lang
  }

}