//import PIXI.Vector from './vector.js'
require('./vector.js')

export const getVector = (pos1, pos2) => {
  const x = pos2.x - pos1.x
  const y = pos2.y - pos1.y
  return new PIXI.Vector(x, y) //{ x, y }
}

export const getDistance = (pos1, pos2) => {
  const vector = getVector(pos1, pos2)
  return vector.length()
}
