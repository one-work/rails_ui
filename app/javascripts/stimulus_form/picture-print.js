import { Controller } from '@hotwired/stimulus'
import { PrintPic } from '../print_pic'

// <input type="file" data-controller="picture">
export default class extends Controller {
  static targets = ['src', 'filename', 'preview', 'upload', 'icon', 'canvas']

  //<input type="file" data-action="picture#upload">
  upload(event) {
    const input = event.currentTarget
    const button = Array.from(input.form.elements).find(el =>
      el.type === 'submit' && el.name === 'commit'
    )
    input.disabled = true
    button.disabled = true

    Array.from(input.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        if (this.hasCanvasTarget) {
          const img = new Image()
          const pic = new PrintPic(img)
          const src = URL.createObjectURL(file) // 创建一个object URL，并不是你的本地路径

          pic.loadImageToCanvas(this.canvasTarget, src, res => {
            URL.revokeObjectURL(src) // 图片加载后，释放object URL
            console.log(res)

            const hiddenInput = document.createElement('input')
            hiddenInput.type = 'hidden'
            hiddenInput.name = input.name
            input.insertAdjacentElement('beforebegin', hiddenInput)

            const arr = this.#image(res.data, res.meta)
            const x = new Uint8Array(arr)
            hiddenInput.value = x.toBase64()
          })
        }
      }
    })

    input.value = null
  }

  removePreview(e) {
    const valueInput = this.element.querySelector('input[type=hidden]')
    if (valueInput) {
      valueInput.remove()
    }

    const fileInput = this.element.querySelector('input[type=file]')
    if (fileInput) {
      fileInput.disabled = false
    }

    const uploadIcon = this.uploadTarget.querySelector('.file-cta')
    if (uploadIcon) {
      uploadIcon.classList.remove('invisible')
    }

    const wrap = e.currentTarget.parentNode
    wrap.remove()
  }

  #image(value, meta) {
    const data = []
    data.push(0x1b, 0x40)  // 初始化打印机：清除打印缓存，各参数恢复默认值
    data.push(0x1d, 0x4c, 0x12, 0x00)  // 设置左限（左边距）：向右移动 18（0x12）点
    data.push(
      0x1d, 0x76, 0x30, 0x00,
      ...this.#doubleDigit(meta.byteWidth),
      ...this.#doubleDigit(meta.height),
      ...value
    )
    data.push(...Array(5).fill(0x0a)) // 增加换行
    return data
  }

  #doubleDigit(value) {
    return [value % 256, Math.floor(value / 256)]
  }

}
