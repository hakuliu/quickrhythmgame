
var tempo_ms = Math.floor((Math.random() * 292) + 375)//DELAY IN MS between sounds.
var nextExpected = 0;
var totalscore = 0;
var lastSoundTime;//used in case you've really messed up.

function update() {
    t = getTimeMS();
    lastSoundTime = t;
    nextExpected = lastSoundTime + tempo_ms;
    //if(isSeeding() || testDone()) {
        Sound.play("kickmeaty");
    //}
}
function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000"; // Set color to black
    canvas.fillText("Tempo is: " + tempo_ms, 50, 50);
    canvas.fillText("Sound Ending in..." + (numstarter - startervar), 50, 100);
    canvas.fillText("Score: "+totalscore, 50, 125);
}


var currenttest = 0;
function respondKey() {
    difftest = Math.abs(getScore());
    console.log("difftest: " + difftest);
    if(isSeeding()) {
        doSeedingBehavior(difftest);
    } else {
        doTest(difftest);
    }
}
function doSeedingBehavior(difftest) {
var starterthresh = 60;//ms
    if(difftest < starterthresh) {
            startervar++;
        } else {
            startervar = 0;
        }
}
function doTest(difftest) {
    currenttest++;
    if(currenttest <= numtests && difftest <= tempo_ms) {
        ratio = parseFloat(difftest) / parseFloat(tempo_ms/2.0);
        score = 1 - ratio;
        score = score * (1000.0/numtests);
        totalscore = totalscore + score;
        console.log("test " + currenttest + " score " + difftest + ", " + score);
    }
}
function getScore() {
    t = getTimeMS();
    mid = tempo_ms/2.0;
    tempscore = t - lastSoundTime;
    if(tempscore >= mid) {
        console.log("from expected");
        return nextExpected - t;
    } else {
        console.log("from last")
        return tempscore;
    }
}
function getTimeMS() {
    var d = new Date();
    var t = d.getTime();
    return t;
}
var startervar = 0;
var numstarter = 10;
function isSeeding() {
    return startervar < numstarter;
}
var numtests = 20;
function testDone() {
    return currenttest >= numtests;
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