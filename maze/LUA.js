let tic = 0;
const w = {
    x: window.innerWidth - 6,
    y: window.innerHeight - 6
}
let colors = ["rgb(30, 30, 30)", "rgb(200, 200, 200", "rgb(30, 30, 200)"];
const canvas = document.getElementById('lua');
const ctx = canvas.getContext('2d');
var pen = {
    x: 0,
    y: 0,
    d: 1,
    move: function(dx, dy){
        grid[this.x][this.y].color = colors[2];
        this.x += +(dx);
        this.y += +(dy);
    }
}
function clear(){
    //limpa a tela
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawRect(x, y, scolor){
    ctx.fillStyle = scolor;
    ctx.fillRect(x, y, 10, 10);
}

function animation(){
    requestAnimationFrame(animation);
    clear();
    for(i in grid){
        for(j in grid[i]){
            let cell = grid[i][j];
            drawRect(20*i, 20*j, cell.color);
            if(grid[i][j].ex && i != grid.length-1){
                let color = colors[0];
                let excell = grid[+(i)+1][j];
                if(excell.color === cell.color){
                    color = cell.color
                }else{
                    color = colors[1]
                }
                drawRect(20*i+10, 20*j, color);
            }
            if(grid[i][j].ey && j != grid[0].length-1){
                let color = colors[0];
                let eycell = grid[i][+(j)+1];
                if(eycell.color === cell.color){
                    color = cell.color
                }else{
                    color = colors[1]
                }
                drawRect(20*i, 20*j+10, color);
            }
        }
    }
    tic+=1/64;
}

canvas.width = w.x;
canvas.height = w.y;
//redimensionar o canvas

let grid = [];
let gx = Math.floor(w.x/20);
let gy = Math.floor(w.y/20);
for(i=0; i<=gx; i++){
    grid[i] = [];
    for(j=0; j<=gy; j++){
        let r1 = Math.random() * 1.5;
        let r2 = Math.random() * 1.5;
        if(r1 > 1){
            r1 = false;
        }else{
            r1 = true;
        }
        if(r2 > 1){
            r2 = false;
        }else{
            r2 = true;
        }
        grid[i][j] = {
            ex: r1,
            ey: r2,
            color: colors[1],
        };
    }
}

animation();