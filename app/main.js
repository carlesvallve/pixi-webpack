//import * as PIXI from 'pixi.js';
import pubsub from 'pubsub-js'
import App from './components/App'

const renderer = PIXI.autoDetectRenderer(window.innerWidth -0, window.innerHeight - 4, {backgroundColor: 0x666666})
const stage = new PIXI.Container()

renderer.view.style.position = "absolute"
renderer.view.style.display = "block"
renderer.autoResize = true
renderer.resize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.view);

const app = stage.addChild(new App({renderer}))

animate();

function animate() {
    pubsub.publish('render', { /* pass any params you wish */ });
    renderer.render(stage);
    requestAnimationFrame(animate);
}
