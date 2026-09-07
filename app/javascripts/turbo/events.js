document.addEventListener('turbo:before-fetch-request', event => {
  const xhr = event.detail.fetchOptions
  xhr.headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone

  if (history.state.turbo) {
    xhr.headers['RestoreIndex'] = history.state.turbo.restorationIndex
  }
  // 识别为弹出的 Modal 层
  if (event.target.tagName === 'FORM' && event.target.classList.contains('modal-card')) {
    xhr.headers['x'] = 'x'
  }
})

document.addEventListener('turbo:before-frame-render', event => {
  if (event.detail.newFrame.title) {
    document.title = event.detail.newFrame.title
  }
})


document.addEventListener('turbo:before-morph-element', event => {
  const oldEl = event.target
  if (oldEl.nodeType !== Node.ELEMENT_NODE) return
  const ctrl = oldEl.getAttribute('data-controller')
  if (!ctrl || !ctrl.includes('appear-visible')) return

  const newEl = event.detail.newElement
  if (newEl) {
    oldEl.replaceWith(newEl)
  } else {
    oldEl.remove()
  }

  event.preventDefault()
})

document.addEventListener('turbo:load', event => {
  document.documentElement.classList.add('no-hover')
  setTimeout(() => {
    document.documentElement.classList.remove('no-hover')
  }, 50)
})
