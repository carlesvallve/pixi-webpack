import pubsub from 'pubsub-js'
import HexTile from './HexTile'

const HexGrid = (stage, mapsize_x = 8, mapsize_y = 8) => {

  const grid = new PIXI.Container();
  stage.addChild(grid)

  for (let x = 0; x < mapsize_x; x++) {
    for (let y = 0; y < mapsize_y; y++) {
      HexTile(grid, x, y)
    }
  }

  grid.position.x =  (window.innerWidth / 2) - grid.width / 2  + 32//- (((mapsize_x) / 2) * 40);
  grid.position.y = window.innerHeight / 2

  // pubsub.subscribe('render', () => {});
}

export default HexGrid

// Populate each row while we have vertical space on the canvas
// After each hex (column), increment the x direction by the width of the hex + the side length until we run out of horizontal space on the canvas
// Every other row must be offset in the x direction by the width of the hex minus the side length divided by two
// After each row increment the y direction by 1/2 the height of the hex
