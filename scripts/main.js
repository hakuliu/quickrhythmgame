var textX = 50;
var textY = 50;
var lasttime = 0;
var dt = 0;
function update() {
    textX += 1;
    textY += 1;
}
function draw() {
    canvas.fillStyle = "#ff0";
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000"; // Set color to black
    canvas.fillText("Sup Bro!", 50, 50);


    canvas.fillText(""+dt, 50, 75);
}

$(function() {
  window.keydown = {};

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