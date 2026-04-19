export class PrintPic {

  constructor(img, dpr = 1) {
    this.dpr = dpr
    this.img = img
    this.defaultWidth = 280  // 统一缩放到 280 点宽（58 mm 纸）
  }

  // 画 canvas 并取 RGBA
  loadImageToCanvas(canvas, src, success) {
    console.debug('图片 src：', src)
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const img = this.img

    img.src = src
    img.addEventListener('load', () => {
      const w = img.width
      const h = img.height
      const dw = this.defaultWidth
      const dh = Math.round((h * dw) / w)
      console.debug('图片信息：', w, h, dw, dh)

      // 为了兼容高 DPR，我们把 canvas 的像素尺寸按 dpr 放大，
      // 并直接在像素级别绘制图像，这样拿到的 imageData 就是按物理像素的。
      canvas.width = dw
      canvas.height = dh

      // 把图像拉伸到 canvas 的像素尺寸
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      console.debug('canvas 数据：', imageData)
      window.xxx = imageData
      // 传入实际的像素宽高（已乘 dpr）到后续处理
      const data = this.imgToRaster(imageData.data, canvas.width, canvas.height)
      console.debug('转化后的数据:', data)
      success?.(data)
    })
  }

  // RGBA → 1 bit 光栅命令
  // imgToRaster(buf, w, h, options)
  // options: { dither: boolean, method: 'floyd' }
  imgToRaster(buf, w, h, options = {}) {
    // grayArray: 每个像素的灰度值（0-255）
    // alphaMask: 对应像素是否不透明（true 表示参与阈值统计和打印决策）
    const grayArray = []
    const alphaMask = []
    const hist = new Array(256).fill(0)
    let nonTransparentPixels = 0
    const { dither = false, method = 'floyd' } = options

    for (let i = 0; i < buf.length; i += 4) {
      const r = buf[i]
      const g = buf[i + 1]
      const b = buf[i + 2]
      const a = buf[i + 3]
      const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114)
      grayArray.push(gray)
      const opaque = a > 0
      alphaMask.push(opaque)
      if (opaque) {
        hist[gray]++
        nonTransparentPixels++
      }
    }

    // 计算 Otsu 阈值（只基于不透明像素）
    let sum = 0
    for (let i = 0; i < 256; i++) {
      sum += i * hist[i]
    }
    let sumB = 0
    let wB = 0
    let maxBetween = 0
    let threshold = 0

    for (let t = 0; t < 256; t++) {
      wB += hist[t]
      if (wB === 0) continue
      const wF = nonTransparentPixels - wB
      if (wF === 0) break

      sumB += t * hist[t]
      const mB = sumB / wB
      const mF = (sum - sumB) / wF
      const between = wB * wF * (mB - mF) ** 2

      if (between > maxBetween) {
        maxBetween = between
        threshold = t
      }
    }
    console.debug('Threshold:', threshold)

    // 构建二值位图（透明像素强制为 0 / 不打印）
    const bmp = new Uint8Array(grayArray.length)

    if (dither && method === 'floyd') {
      // Floyd–Steinberg error diffusion
      const img = new Float32Array(grayArray) // mutable copy for error propagation
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x
          if (!alphaMask[idx]) {
            bmp[idx] = 0
            continue
          }
          const oldVal = img[idx]
          const newVal = oldVal < threshold ? 0 : 255
          const err = oldVal - newVal
          bmp[idx] = newVal === 0 ? 1 : 0

          // distribute error to neighbors, but only to opaque pixels
          // right: x+1, y
          if (x + 1 < w) {
            const nIdx = idx + 1
            if (alphaMask[nIdx]) img[nIdx] += err * 7 / 16
          }
          // bottom-left: x-1, y+1
          if (x - 1 >= 0 && y + 1 < h) {
            const nIdx = idx + w - 1
            if (alphaMask[nIdx]) img[nIdx] += err * 3 / 16
          }
          // bottom: x, y+1
          if (y + 1 < h) {
            const nIdx = idx + w
            if (alphaMask[nIdx]) img[nIdx] += err * 5 / 16
          }
          // bottom-right: x+1, y+1
          if (x + 1 < w && y + 1 < h) {
            const nIdx = idx + w + 1
            if (alphaMask[nIdx]) img[nIdx] += err * 1 / 16
          }
        }
      }
    } else {
      for (let i = 0; i < grayArray.length; i++) {
        if (!alphaMask[i]) {
          bmp[i] = 0
        } else {
          bmp[i] = grayArray[i] < threshold ? 1 : 0
        }
      }
    }
    console.debug('转灰度后的数据：', bmp.length)

    const bytesPerLine = Math.ceil(w / 8)
    const raster = []
    const dataStr = []

    // 逐行、逐字节汇总，避免在循环中使用数组 splice（性能更好）
    for (let y = 0; y < h; y++) {
      const rowOffset = y * w
      for (let xb = 0; xb < bytesPerLine; xb++) {
        let byte = 0
        for (let bit = 0; bit < 8; bit++) {
          const x = xb * 8 + bit
          const idx = rowOffset + x
          const bitVal = x < w ? bmp[idx] : 0
          byte = (byte << 1) | (bitVal & 1)
        }
        raster.push(byte)
        dataStr.push(byte.toString(16).padStart(2, '0'))
      }
    }

    return {
      data: raster,
      dataStr: dataStr,
      meta: {
        width: w,
        byteWidth: bytesPerLine,
        height: h
      }
    }
  }

}
  