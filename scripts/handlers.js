import { Game } from "./game.js"

const game = new Game()

addEventListener("resize", game.resize)

document.addEventListener("DOMContentLoaded", game.resize)

const key_pressed = () => {
  let c = 0
  let a = 0

  if (pressed["w"]) c += 1
  if (pressed["s"]) c -= 1
  if (pressed["a"]) a += 1
  if (pressed["d"]) a -= 1

  if (a || c) game.move(c, a, pressed["shift"])

  setTimeout(key_pressed, 15)
}

let pressed = {}
key_pressed()

document.addEventListener("keydown", (e) => (pressed[e.key.toLowerCase()] = true))
document.addEventListener("keyup", (e) => (pressed[e.key.toLowerCase()] = false))
