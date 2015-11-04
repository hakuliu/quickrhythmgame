

var lasttime = 0;
var dt = 0;
var tempo_ms = Math.floor((Math.random() * 292) + 375)//DELAY IN MS between sounds.
var nextExpected = 0;


function update() {
    var d = new Date();
    var t = d.getTime();
    if(t >= nextExpected) {
        nextExpected = nextExpected + tempo_ms;
        Sound.play("kickmeaty");
    }
}
function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000"; // Set color to black
    canvas.fillText(tempo_ms, 50, 50);
    canvas.fillText(dt, 50, 75);
}

$(function() {
  window.keydown = {};
    var d = new Date();
    var t = d.getTime();
    nextExpected = t;
    nextExpected = nextExpected + tempo_ms;
  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind("keydown", function(event) {
    keydown[keyName(event)] = true;
    var d = new Date();
    var t = d.getTime();
    dt = t - lasttime;
    lasttime = t;
  });

  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});