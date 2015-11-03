var textX = 50;
var textY = 50;
var lasttime = 0;
function update() {
    textX += 1;
    textY += 1;
}
function draw() {
    canvas.fillStyle = "#ff0";
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000"; // Set color to black
    canvas.fillText("Sup Bro!", 50, 50);

    var d = new Date();
    var t = d.getTime();
    var dt = t - lasttime;
    canvas.fillText(""+dt, 50, 75);
    lasttime = t;
}