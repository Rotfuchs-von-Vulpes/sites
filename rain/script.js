const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = {
  x: window.innerWidth - 7,
  y: window.innerHeight - 7
}
var water = [];
var tic = 0;

function newDrop(x, y){
  this.x = x;
  this.y = y;
  this.dx = Math.random()/10 + 0.05;
  this.dy = Math.random()/5 + 2;
  this.draw = function(){
    ctx.fillStyle = '#2B338A';
    let x = this.x;
    for(j=0; j <= 5; j++){
      ctx.fillRect(x, this.y+j, 1, 1);
      x+=this.dx;
    }
  }
  this.move = function(){
    this.x += this.dx;
    this.y += this.dy;
  }
}

function create(n){
  for(i=0; i <= n; i++){
    let x = Math.random() * w.x;
    let drop = new newDrop(x, 0);
    water.push(drop)
  }
}

canvas.width = w.x;
canvas.height = w.y;

create(16);

setInterval(() => {
  tic++;
  prob = Math.random();
  if(prob < 0.01){
    ctx.fillStyle = 'gray';
  }else{
    ctx.fillStyle = 'black';
  }
  ctx.fillRect(0, 0, w.x, w.y);
  for(i of water){
    i.draw();
    i.move();
  }
  if (tic%2 == 0){
    create(1);
  }
}, 32)