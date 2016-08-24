var canvasDiv = document.getElementById('canvasDiv');
var canvasWidth = 400;
var canvasHeight = 200;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var clickSize = new Array();
var curSize = "normal";
var clickTool = new Array();
var curTool = "crayon";

var curColor = colorPurple;
var clickColor = new Array();

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

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(curTool == "eraser"){
    clickColor.push("white");
  }else{
    clickColor.push(curColor);
  }
  clickColor.push(curColor);
  clickSize.push(curSize);
}

function redraw(){
  /* context.strokeStyle = "#df4b26"; */
  context.lineJoin = "round";
  context.lineWidth = 5;

  context.save();
  context.beginPath();
  context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
  context.clip();
      
  for(var i=0; i < clickX.length; i++){   
    context.beginPath();
    if(clickDrag[i] && i){
      contex.moveTo(clickX[i-1], clickY[i-1]);
    }else{
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.restore();
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = radius;
    context.stroke();

    if(curTool == "crayon") {
    context.globalAlpha = 0.4;
    context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
  }
  context.globalAlpha = 1;
  }
}