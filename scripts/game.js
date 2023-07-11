import { draw_data, meonmap, move_size } from "./config.js"
import { initial_state } from "./state.js"

export class Game {
  constructor() {
    this.canvas = document.getElementById("game_canvas")
    this.ctx = this.canvas.getContext("2d")
    this.state = initial_state
  }

  clear = () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

  resize = () => {
    this.canvas.height = this.canvas.offsetHeight
    this.canvas.width = this.canvas.offsetWidth

    this.redraw()
  }

  redraw = () => {
    this.clear()
    this.draw_state_objects()
    this.draw_me()
  }

  move = (c, a, quick) => {
    this.state.whereami.a += a * move_size.a * (quick ? 2 : 1)

    this.state.whereami.y -= c * Math.cos(this.state.whereami.a) * move_size.c * (quick ? 3 : 1)
    this.state.whereami.x -= c * Math.sin(this.state.whereami.a) * move_size.c * (quick ? 3 : 1)

    this.redraw()
  }

  draw_me = () => {
    this.ctx.beginPath()
    this.ctx.arc(this.meonmap_position().x, this.meonmap_position().y, draw_data.me.size, 0, Math.PI * 2)

    this.ctx.fillStyle = draw_data.me.color
    this.ctx.fill()

    this.ctx.strokeStyle = draw_data.me.border
    this.ctx.stroke()

    this.ctx.closePath()
  }

  draw_state_objects = () => {
    for (const obj of this.state.objects) {
      const abs_coords = this.abs_position(
        this.meonmap_position(),
        this.relative_position(this.state.whereami, obj.coords),
      )

      this.ctx.beginPath()
      const start = this.abs_position(abs_coords, this.relative_position(this.circuit_relative(), obj.circuit[0]))
      this.ctx.moveTo(start.x, start.y)

      for (let i = 1; i < obj.circuit.length; i++) {
        const point = this.abs_position(abs_coords, this.relative_position(this.circuit_relative(), obj.circuit[i]))
        this.ctx.lineTo(point.x, point.y)
      }

      this.ctx.fillStyle = draw_data.objects[obj.type].color
      this.ctx.fill()

      this.ctx.closePath()

      this.ctx.beginPath()
      for (let i = 0; i < obj.circuit.length; i++) {
        for (let j = i + 1; j < obj.circuit.length; j++) {
          const start = this.abs_position(abs_coords, this.relative_position(this.circuit_relative(), obj.circuit[i]))
          const end = this.abs_position(abs_coords, this.relative_position(this.circuit_relative(), obj.circuit[j]))
          this.ctx.moveTo(start.x, start.y)
          this.ctx.lineTo(end.x, end.y)
        }
      }

      this.ctx.strokeStyle = draw_data.objects[obj.type].border
      this.ctx.stroke()

      this.ctx.closePath()
    }
  }

  abs_position = (parent, coords) => {
    return {
      x: parent.x - coords.x,
      y: parent.y - coords.y,
    }
  }

  relative_position = (parent, coords) => {
    const cos = Math.cos(parent.a)
    const sin = Math.sin(parent.a)
    return {
      x: (parent.x - coords.x) * cos - (parent.y - coords.y) * sin,
      y: (parent.x - coords.x) * sin + (parent.y - coords.y) * cos,
    }
  }

  circuit_relative = () => {
    return { x: 0, y: 0, a: this.state.whereami.a }
  }

  meonmap_position = () => {
    return { x: meonmap.x * this.canvas.width, y: meonmap.y * this.canvas.height }
  }
}
