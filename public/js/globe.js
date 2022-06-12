const c = document.getElementById('homecanvas')
const $ = c.getContext('2d')
const w = c.width = 420
const h = c.height = 420

class Point {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  rotateX(amount) {
    let y = this.y
    this.y = (y * Math.cos(amount)) + (this.z * Math.sin(amount) * -1.0)
    this.z = (y * Math.sin(amount)) + (this.z * Math.cos(amount))
  }

  rotateY(amount) {
    let x = this.x
    this.x = (x * Math.cos(amount)) + (this.z * Math.sin(amount) * -1.0)
    this.z = (x * Math.sin(amount)) + (this.z * Math.cos(amount))
  }

  rotateZ(amount) {
    let x = this.x
    this.x = (x * Math.cos(amount)) + (this.y * Math.sin(amount) * -1.0)
    this.y = (x * Math.sin(amount)) + (this.y * Math.cos(amount))
  }

  getProjection(distance, xy, offSet, offSetZ) {
    return ((distance * xy) / (this.z - offSetZ)) + offSet
  }

  draw(x, y, size, color) {
    $.save()
    $.beginPath()
    $.fillStyle = color
    $.arc(x, y, size, 0, 2 * Math.PI, true)
    $.fill()
    $.restore()
  }
}

class Sphere {
  constructor(radius = 20.0) {
    this.point = []
    this.color = "#0000ff"
    this.radius = radius
    this.numberOfVertexes = 0

    this.rotation = 0
    this.distance = 0

    this.init()
  }

  init() {
    for (let alpha = 0; alpha <= 6.28; alpha += 0.17) {
      let p = this.point[this.numberOfVertexes] = new Point()

      p.x = Math.cos(alpha) * this.radius
      p.y = 0
      p.z = Math.sin(alpha) * this.radius

      this.numberOfVertexes++
    }

    for (let direction = 1; direction >= -1; direction -= 2) {
      for (let beta = 0.17; beta < Math.PI; beta += 0.17) {
        let radius = Math.cos(beta) * this.radius
        let fixedY = Math.sin(beta) * this.radius * direction

        for (let alpha = 0; alpha < 6.28; alpha += 0.17) {
          let p = this.point[this.numberOfVertexes] = new Point()

          p.x = Math.cos(alpha) * radius
          p.y = fixedY
          p.z = Math.sin(alpha) * radius

          this.numberOfVertexes++
        }
      }
    }
  }

  draw() {
    let x, y
    let p = new Point()

    for (let i = 0; i < this.numberOfVertexes; i++) {
      p.x = this.point[i].x
      p.y = this.point[i].y
      p.z = this.point[i].z

      p.rotateX(this.rotation)
      p.rotateY(this.rotation)
      p.rotateZ(this.rotation)

      x = p.getProjection(this.distance, p.x, w / 2.0, 100.0)
      y = p.getProjection(this.distance, p.y, h / 2.0, 100.0)

      if ((x >= 0) && (x < w)) {
        if ((y >= 0) && (y < h)) {
          if (p.z < 0) {
            p.draw(x, y, 1, "#0000ff")
          } else {
            p.draw(x, y, 1, "#0000ff")
          }
        }
      }
    }
  }

  update() {
    this.rotation += Math.PI / 360.0
    //set sphere radius
    if (this.distance < 1000) {
      this.distance += 10
    }
  }
}

const sphere = new Sphere()

function draw() {
  window.requestAnimationFrame(draw)

  $.save()
  $.clearRect(0, 0, w, h)

  sphere.draw()

  $.restore()

  sphere.update()
}

draw()
