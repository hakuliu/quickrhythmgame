
var tempo_ms = 500;//Math.floor((Math.random() * 292) + 375)//DELAY IN MS between sounds.
var nextExpected = 0;
var totalscore = 0;
var lastSoundTime;//used in case you've really messed up.
var beatdiv = Math.floor((Math.random() * 6)+1);
var beattype = Math.floor((Math.random() * 3));
var typelut = ["lowkick", "mediumtone", "highclick"];
var currentbeat = 0;

function update() {
    t = getTimeMS();
    lastSoundTime = t;
    nextExpected = lastSoundTime + tempo_ms;
    if(isSeeding() || testDone()) {

        if(beatdiv > 1 && currentbeat % beatdiv == 0) {
            Sound.play(getBeatType()+"/major");
        } else {
            Sound.play(getBeatType()+"/minor");
        }

    }
    currentbeat++;
}
function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000"; // Set color to black
    tempo_tempo = Math.round((1000.0/tempo_ms)*60);//beats per minute like normal music.

    canvas.fillText("Tempo is: " + tempo_tempo, 50, 25);
    canvas.fillText("beat division is: " + beatdiv, 50, 50);
    canvas.fillText("beat type is: " + getBeatType(), 50, 75);
    canvas.fillText("Sound Ending in..." + (numstarter - startervar), 50, 100);
    canvas.fillText("Score: "+Math.round(totalscore), 50, 125);
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
function getBeatType() {
    type = typelut[beattype];
    return type;
}

$(function() {
  window.keydown = {};
  setInitVal();
  $(document).bind("keydown", function(event) {
    respondKey();
  });

  $(document).bind("keyup", function(event) {
  });
});

var intervalID;
function parsevals() {
    tempo = parseInt(document.getElementById('tempo').value);
    tempo_ms = (60.0/tempo)*1000;

    beatdiv = parseInt(document.getElementById('division').value);

    beattype = document.getElementById('soundtype').value
}
function resetTestVars() {
    currentbeat = 0;
    totalscore = 0;
    startervar = 0;
    currenttest = 0;
}
function restart() {
    parsevals();

    resetTestVars();

    clearInterval(intervalID);

    intervalID = setInterval(function() {
                  update();
                }, tempo_ms);
}

function setInitVal() {
    document.getElementById('tempo').value = Math.round((1000.0/tempo_ms)*60);
    document.getElementById('division').value = beatdiv;
    document.getElementById('soundtype').value = beattype;
}