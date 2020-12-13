const colors = ["#391513", '#f7b23b', '#a82200', '#c05236', '#405b3e']
//lista de cores
const w = {
  x: window.innerWidth - 6,
  y: window.innerHeight - 6
}

const canvas = document.getElementById('lua');
const ctx = canvas.getContext('2d');

function clear() {
  //limpa a tela
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}
var c = [];

canvas.width = w.x;
canvas.height = w.y;
//redimensionar o canvas

for(i=0; i<=w.x; i++){
  c[i] = [];
  for(j=0; j<=w.y; j++){
    c[i][j] = 256 * Math.random();
    let color = c[i][j];
    ctx.fillStyle = "rgb("+color+","+color+","+color+")";
    ctx.fillRect(i, j, 1, 1);
  }
}