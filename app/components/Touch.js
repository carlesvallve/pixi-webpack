import pubsub from 'pubsub-js'

export class Touch extends PIXI.Graphics { //PIXI.Container {
  constructor() {
    super()
    this.debug = false
    this.draw = false

    //Attach touch event listeners
    window.addEventListener("touchstart", this.start.bind(this), false)
    window.addEventListener("touchend", this.end.bind(this), false)
    window.addEventListener("touchcancel", this.cancel.bind(this), false)
    window.addEventListener("touchmove", this.move.bind(this), false)
    this.log("initialized.");

    this.ongoingTouches = [];
  }


  /*
   A new touch on the surface has occurred
  */
  start(evt) {
    // keep the browser from continuing to process the touch event
    // (this also prevents a mouse event from also being delivered)
    evt.preventDefault()
    var ctx = this
    ctx.clear()
    var touches = evt.changedTouches

    for (var i = 0; i < touches.length; i++) {
      //this.log("touchstart:" + i + "...");
      this.ongoingTouches.push(this.copyTouch(touches[i]));

      if (this.draw) {
        var color = this.colorForTouch(touches[i]);
        this.lineStyle(1, color, 1)
        this.drawCircle(touches[i].pageX, touches[i].pageY, 5)
      }


      //this.log("touchstart:" + i + ".");
    }

    pubsub.publish('touchStart', { touches: touches } )
  }


  /*
  Each time one or more fingers moves, a touchmove event is delivered
  */
  move(evt) {
    evt.preventDefault();
    var ctx = this
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      var color = this.colorForTouch(touches[i]);
      var idx = this.ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        //this.log("continuing touch "+idx);

        if (this.draw) {
          this.lineStyle(1, color, 1);
          this.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
          this.lineTo(touches[i].pageX, touches[i].pageY);
        }

        this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i]));  // swap in the new touch record
      } else {
        this.log("can't figure out which touch to continue");
      }
    }

    pubsub.publish('touchMove', { touches: touches, idx: idx } )
  }


  /*
  When the user lifts a finger off the surface, a touchend event is sent
  */
  end(evt) {
    evt.preventDefault();
    //this.log("touchend");
    var ctx = this
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      var color = this.colorForTouch(touches[i]);
      var idx = this.ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {

        if (this.draw) {
          this.lineStyle(1, color, 1)
          this.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
          this.lineTo(touches[i].pageX, touches[i].pageY);
          this.drawRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
        }

        this.ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else {
        console.log("can't figure out which touch to end");
      }
    }

    pubsub.publish('touchEnd', { touches: touches, idx: idx } )
  }


  /*
  If the user's finger wanders into browser UI, or the touch otherwise needs to be canceled
  */
  cancel(evt) {
    evt.preventDefault();
    console.log("touchcancel.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      var idx = this.ongoingTouchIndexById(touches[i].identifier);
      this.ongoingTouches.splice(idx, 1);  // remove it; we're done
    }

    pubsub.publish('touchCancel', { touches: touches, idx: idx } )
  }


  // Convenience Functions

  /*
  Finding an ongoing touch
  Scans through the ongoingTouches array to find the touch matching the given identifier,
  then returns that touch's index into the array.
  */
  ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < this.ongoingTouches.length; i++) {
      var id = this.ongoingTouches[i].identifier;

      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }

  /*
  Some browsers (mobile Safari, for one) re-use touch objects between events,
  so it's best to copy the bits you care about, rather than referencing the entire object.
  */
  copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
  }


  /*
  Pick a color based on the touch's unique identifier
  */
  colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    //this.log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
  }

  /*
  Showing what's going on
  */
  log(msg) {
    if (!this.debug) { return }
    var p = document.getElementById('info');
    p.innerHTML = msg + "\n" + p.innerHTML;
  }
}

export default Touch
