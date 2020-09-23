const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = {
  x: window.innerWidth,
  y: window.innerHeight
}
var grid = {
  c: 0
}

function resize(){
  if(w.x < w.y){
    grid.c = w.x/3;
  }else{
    grid.c = w.y/3;
  }
}

canvas.height = w.y;
canvas.width = w.x;
resize();

ctx.translate(w.x/2, w.y/2);
ctx.fillStyle = '#9E9FA7';
ctx.strokeStyle = '#9E9FA7';
ctx.fillRect(0, 0, 1, 1);
ctx.moveTo(-(w.x/2),0);
ctx.lineTo(w.x/2,0);
ctx.stroke();
ctx.moveTo(0, -(w.y/2));
ctx.lineTo(0, w.y/2);
ctx.stroke();

for(i=-w.x/2; i<=w.x/2; i++){
  for(j=-w.y/2; j<=w.y/2; j++){
    let c1 = i/grid.c;
    let c2 = j/grid.c;
    let x = c1; let y = c2;
    for(k=0; k<=50; k++){
      let x1 = x**2 - y**2 + c1;
      let y1 = 2*x*y + c2;
      x = x1; y = y1;
      if(x**2 + y**2 > 4){
        ctx.fillRect(i, j, 1, 1)
        break;
      }
    }
  }
}

//teste