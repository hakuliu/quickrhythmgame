var textX = 50;
var textY = 50;

function update() {
    textX += 1;
    textY += 1;
}
function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000"; // Set color to black
    canvas.fillText("Sup Bro!", textX, textY);
}