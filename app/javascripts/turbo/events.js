document.addEventListener('turbo:before-fetch-request', event => {
  const xhr = event.detail.fetchOptions
  xhr.headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone

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
