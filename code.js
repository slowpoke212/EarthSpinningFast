var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var loop;


function entity (x, y, width, height) {
    this.width = width;
    this.height = height;
    this.xspeed = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.yspeed = 0;    
    this.x = x;
    this.y = y;   
  this.newPos = function() {
	this.gravitySpeed += this.gravity;
	this.x += this.xspeed; 
	if (this.y > c.height - this.height) {
		this.onground = true
		this.y = c.height - this.height
		this.gravitySpeed = 0
		this.gravity = 0
}
	this.y += this.yspeed + this.gravitySpeed;
    }; 
    this.update = function() {

        ctx.rect(this.x, this.y, this.width, this.height);
    }
    this.crashWith = function(x, y, w, h) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = x;
    var otherright = x + (w);
    var othertop = y;
    var otherbottom = y + (h);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
      
}

var player = new entity(250, 100, 10, 10);
function accelerate(n) {
  player.gravity = n;
player.onground = false
}
document.addEventListener('keypress', function (e) {
  
  if (e.code === "KeyW") {
if(player.onground == true){
   accelerate(-0.1)
	setTimeout(function(){player.gravity = 0.2;}, 500)
	player.onground = false
}
  

  }
});
document.addEventListener('keypress', function (e) {
  if (e.code === "KeyD") {
      player.xspeed = 2


  }
});
document.addEventListener('keypress', function (e) {
  if (e.code === "KeyA") {
      player.xspeed = -2


  }
});
document.addEventListener('keyup', function (e) {
  if (e.code === "KeyD" || e.code === "KeyA") {
player.xspeed = 0
  }
  if (e.code === "KeyW" || e.code === "KeyS") {
  player.gravity = 0.1;
  }
});



function draw(){
	player.newPos();
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.rect(0, 0, c.width, c.height);
	ctx.fillStyle = "gray";
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";
	player.update();
	
	ctx.stroke();
}
loop = setInterval(draw, 10);
function getRandomInt(max) { 
  return Math.floor(Math.random() * Math.floor(max));
}
function getRandomInt2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}