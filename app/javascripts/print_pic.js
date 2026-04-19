export class PrintPic {

  constructor(img, dpr = 1) {
    this.dpr = dpr
    this.img = img
    this.defaultWidth = 280  // 统一缩放到 384 点宽（58 mm 纸）
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

      canvas.width = dw * this.dpr
      canvas.height = dh * this.dpr
      //ctx.scale(dpr, dpr)

      ctx.drawImage(img, 0, 0, dw, dh)
      const imageData = ctx.getImageData(0, 0, dw, dh)
      console.debug('canvas 数据：', imageData)
      window.xxx = imageData
      const data = this.imgToRaster(imageData.data, dw, dh)
      console.debug('转化后的数据:', data)
      success?.(data)
    })
  }

  // RGBA → 1 bit 光栅命令
  imgToRaster(buf, w, h) {
    const grayArray = []
    const hist = new Array(256).fill(0)
    let nonTransparentPixels = 0
    const totalPixels = Math.floor(buf.length / 4)

    for (let i = 0; i < buf.length; i += 4) {
      const gray = Math.round(buf[i] * 0.299 + buf[i + 1] * 0.587 + buf[i + 2] * 0.114)
      if (buf[i + 3] > 0) {
        hist[gray]++
        nonTransparentPixels++
      }
    }

    let sum = 0
    for (let i = 0; i < 256; i++) {
      sum += i * hist[i]
    }
    let sumB = 0
    let wB = 0
    let maxBetween = 0
    let threshold = 0

    // 专为 8-bit 灰度图像优化，固定 256 级
    for (let t = 0; t < 256; t++) {
      wB += hist[t]
      if (wB === 0) continue
      const wF = nonTransparentPixels - wB
      if (wF === 0) break

      sumB += t * hist[t]
      const mB = sumB / wB
      const mF = (sum - sumB) / wF
      const between = wB * wF * (mB - mF) ** 2  // 类间方差

      if (between > maxBetween) {
        maxBetween = between
        threshold = t
      }
    }
    console.debug('Threshold:', threshold)

    for (let i = 0; i < buf.length; i += 4) {
      const gray = Math.round(buf[i] * 0.299 + buf[i + 1] * 0.587 + buf[i + 2] * 0.114)
      if (gray < threshold) {
        grayArray.push(1) // 打印像素点
      } else {
        grayArray.push(0) // 不打印
      }
    }
    console.debug('转灰度后的数据：', grayArray.length)

    const bytesPerLine = Math.ceil(w / 8)
    const raster = []
    const dataStr = []

    for (let y = 0; y < h; y++) {
      const sub = grayArray.splice(0, w)
      for (let x = 0; x < bytesPerLine; x++) {
        const a = parseInt(sub.splice(0, 8).join('').padEnd(8, '0'), 2)
        raster.push(a) // 8 位二进制转 16进制，不足的用 0 补齐
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
  