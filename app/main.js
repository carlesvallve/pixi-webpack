//import * as PIXI from 'pixi.js';
import pubsub from 'pubsub-js'
import Bunny from './components/Bunny'
import HexGrid from './components/HexGrid'

//import { setupMap, drawMap } from './utils/hex/hex'

var renderer = PIXI.autoDetectRenderer(window.innerWidth -0, window.innerHeight - 4, {backgroundColor: 0x1099bb});
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

//const bunny = Bunny(stage)
const grid = HexGrid(stage)

renderer.render(stage);

//const map = setupMap()
//drawMap(map)

animate();

function animate() {
    pubsub.publish('render', { /* pass any params you wish */ });
    renderer.render(stage);
    requestAnimationFrame(animate);
}
