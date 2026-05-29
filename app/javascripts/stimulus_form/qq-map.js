import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    name: String,
    index: Number,
    key: String,
    geo: Object
  }
  static targets = ['load', 'map']

  connect() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords
        console.debug(crd)
        this.#initMap(crd.latitude, crd.longitude)
      },
      err => {
        console.error(err)
        if (this.hasGeoValue) {
          if (this.geoValue.lat && this.geoValue.lng) {
            this.#initMap(this.geoValue.lat, this.geoValue.lng)
          } else {
            this.#initMap(39.984120, 116.307484)
          }
        } else {
          this.#initMap(39.984120, 116.307484)
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  selected(event) {
    this.doSelected(event)
    //this.element.remove()
  }

  select(event) {
    this.doSelected(event)
  }

  #initMap(lat, lng) {
    const center = new TMap.LatLng(lat, lng)
    if (this.hasMapTarget) {
      this.map = new TMap.Map(this.mapTarget, {
        center: center,
        zoom: 17.2
      })
    } else {
      this.map = new TMap.Map(this.element, {
        center: center,
        zoom: 17.2
      })
    }

    window.xx = this.map.getCenter()
    const marker = new TMap.MultiMarker({
      map: this.map,
      styles: {
        highlight: new TMap.MarkerStyle({
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker-pink.png'
        })
      },
      geometries: [{
        position: new TMap.LatLng(xx.lat, xx.lng),
        id: 'marker'
      }]
    })

    const map = this.map
    const editor = new TMap.tools.GeometryEditor({
      map, // 编辑器绑定的地图对象
      overlayList: [{
        overlay: marker, // 可编辑图层
        id: "marker",
        selectedStyleId: "highlight"  // 被选中的marker会变为高亮样式
      }],
      actionMode: TMap.tools.constants.EDITOR_ACTION.INTERACT, // 编辑器的工作模式
      activeOverlayId: "marker", // 激活图层
      selectable: true
    })

    this.map.on('dragend', e => {
      console.debug(e)
      window.xxx = e
    })
  }

  doSelected(event) {
    console.log('selected', event)
    const loc = event.data
    if (loc && loc.module === 'locationPicker') {
      if (this.hasIndexValue) {
        document.getElementById(`${this.nameValue}_${this.indexValue}_lat`).value = loc.latlng.lat
        document.getElementById(`${this.nameValue}_${this.indexValue}_lng`).value = loc.latlng.lng
        document.getElementById(`${this.nameValue}_${this.indexValue}_poiname`).value = loc.poiname
        document.getElementById(`${this.nameValue}_${this.indexValue}_poiaddress`).value = loc.poiaddress
        document.getElementById(`${this.nameValue}_${this.indexValue}_cityname`).value = loc.cityname

        document.getElementById(`${this.indexValue}_name`).innerText = loc.poiname
      } else {
        document.getElementById(`${this.nameValue}_lat`).value = loc.latlng.lat
        document.getElementById(`${this.nameValue}_lng`).value = loc.latlng.lng
        document.getElementById(`${this.nameValue}_poiname`).value = loc.poiname
        document.getElementById(`${this.nameValue}_poiaddress`).value = loc.poiaddress
        document.getElementById(`${this.nameValue}_cityname`).value = loc.cityname
      }
    }
  }

}
