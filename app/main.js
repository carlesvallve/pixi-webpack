//import * as PIXI from 'pixi.js';
import pubsub from 'pubsub-js'
import tweenManager from 'pixi-tween'
import App from './components/App'

// arguments: width, height, view, transparent, antialias
const renderer = PIXI.autoDetectRenderer(
  window.innerWidth -0,
  window.innerHeight - 4,
  { antialias: true, transparent: false, autoResize: true, backgroundColor: 0xFFFFFF }
)
const stage = new PIXI.Container()

renderer.view.style.position = "absolute"
renderer.view.style.display = "block"
renderer.resize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.view)

// window.addEventListener('resize', function(evt){
//   console.log('resizing...', evt)
//   renderer.resize(window.innerWidth, window.innerHeight)
// });

const meter = new FPSMeter({
    theme: 'transparent',     // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
    //heat:  0,               // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.
    //graph:   1,             // Whether to show history graph.
    //history: 20             // How many history states to show in a graph.
})

const app = stage.addChild(new App({renderer}))


/* call this function whenever you added a new layer/container */
stage.updateLayersOrder = function () {
    stage.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
};

animate();

function animate() {
    pubsub.publish('render', { /* pass any params you wish */ })
    stage.updateLayersOrder();
    renderer.render(stage)
    PIXI.tweenManager.update();
    meter.tick()
    requestAnimationFrame(animate)
}
