var canvasDiv = document.getElementById('canvasDiv');
var canvasWidth = 400;
var canvasHeight = 200;
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if (typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

document.getElementById('canvas').mousedown(function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

document.getElementById('canvas').mousemove(function(e) {
  if(paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true)
  }
});

document.getElementById('canvas').mouseup(function(e) {
  paint = false;
});

document.getElementById('canvas').mouseleave(function(e) {
  paint = false;
});

var clickX = newArray();
var clickY = newArray();
var clickDrag = newArray();
var paint;

function addClick(x,y,dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw() {
  context.clearRect(0,0,context.canvas.width, context.canvas.height);

  context.strokeStyle = "#192";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(vari=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i) {
      context.moveto(clickX[i-1], clickY[i-1]);
    } else {
      context.moveto(clickX[i]-1, clickY[i])
    }
    context.lineto(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
}