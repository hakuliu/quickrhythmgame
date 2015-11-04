

var lasttime = 0;
var dt = 0;
var tempo_ms = Math.floor((Math.random() * 292) + 375)//DELAY IN MS between sounds.
var nextExpected = 0;
var totalscore = 0;

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
    canvas.fillText(startervar, 50, 100);
    canvas.fillText("Score: "+totalscore, 50, 125);
}



var startervar = 0;
var currenttest = 0;
function respondKey() {
    var numstarter = 10;
    var starterthresh = 60;//ms
    t = getTimeMS();
    //this is actually WRONG
    //TODO: plz update to use expected time, not lasttime.
    dt = t - lasttime;
    lasttime = t;
    difftest = Math.abs(dt - tempo_ms);
    if(startervar < numstarter) {

        if(difftest < starterthresh) {
            startervar++;
        } else {
            startervar = 0;
        }
    } else {
        var numtests = 20;
        currenttest++;
        if(currenttest <= numtests) {
            ratio = difftest / parseFloat(tempo_ms);
            score = 1 - ratio;
            score = score * (1000.0/numtests);
            totalscore = totalscore + score;
            console.log("test " + currenttest + " score " + (1 - ratio) + ", " + score);
        }
    }
}

function getTimeMS() {
    var d = new Date();
    var t = d.getTime();
    return t;
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
    respondKey();
  });

  $(document).bind("keyup", function(event) {
    keydown[keyName(event)] = false;
  });
});