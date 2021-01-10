let tic = 0;
const w = {
    x: window.innerWidth - 6,
    y: window.innerHeight - 6
}
let directions = [0, 1, 2, 3, 4];
let colors = ["rgb(30, 30, 30)", "rgb(200, 200, 200", "rgb(30, 30, 200)", "rgb(200, 30, 30)"];
let iterator = true;
const canvas = document.getElementById('lua');
const ctx = canvas.getContext('2d');
const pen = {
    x: 0,
    y: 0,
    d: null,
    previous: null,
    mode: true,
    move(dx, dy){
        let cell = grid[this.x][this.y];
        this.previous = {
            x: this.x,
            y: this.y
        };
        cell.visit = true;
        if(dx != 0){
            this.x += dx;
            if(dx > 0){
                cell.ex = true;
            }else{
                grid[this.x][this.y].ex = true;
            }
            
        }else if(dy != 0){
            this.y += dy;
            if(dy > 0){
                cell.ey = true;
            }else{
                grid[this.x][this.y].ey = true;
            }
        }
        let newCell = grid[this.x][this.y];
        if(newCell.visit == false){
            cell.color = colors[2];
            newCell.color = colors[3];
        }else{
            newCell.visit=false;
            cell.color = colors[1];
            newCell.color = colors[3];
        }
    },
    iterator(){
        if(iterator){
            directions = neighborn(this.x, this.y, this.mode);
            for(i=0; i<=3; i++){
                let num = Math.abs(Math.round(Math.random() * directions.length-1));
                let random = directions[num];
                if(random != this.d){
                    this.d = random;
                    console.log(directions);
                    console.log(num);
                    console.log(random);
                    console.log(directions[random])
                    if(random == 0){
                        if(this.x < grid.length-1){
                            if(!grid[this.x+1][this.y].visit && this.mode){
                                this.move(1, 0);
                                break;
                            }else if(!grid[this.x+1][this.y].visit && !this.mode && grid[this.x][this.y].ex == true){
                                this.move(1, 0);
                                break;
                            }else{
                                directions.splice(random, 1);
                            }
                        }
                    }else if(random == 1){
                        if(this.x >= 0){
                            if(!grid[this.x-1][this.y].visit && this.mode){
                                this.move(-1, 0);
                                break;
                            }else if(grid[this.x-1][this.y].visit && !this.mode && grid[this.x+1][this.y].ex == true){
                                this.move(-1, 0);
                                break;
                            }else{
                                directions.splice(random, 1);
                            }
                        }
                        
                    }else if(random == 2){
                        if(this.y < grid[0].length){
                            if(!grid[this.x][this.y+1].visit && this.mode){
                                this.move(0, 1);
                                break;
                            }else if(grid[this.x][this.y+1].visit && !this.mode && grid[this.x][this.y].ey == true){
                                this.move(0, 1);
                                break;
                            }else{
                                directions.splice(random, 1);
                            }
                        }
                    }else if(random == 3){
                        if(this.y >= 0){
                            if(!grid[this.x][this.y-1].visit && this.mode){
                                this.move(0, -1);
                                break;
                            }else if(grid[this.x][this.y-1].visit && !this.mode && grid[this.x][this.y+1].ey == true){
                                this.move(0, -1);
                                break;
                            }else{
                                directions.splice(random, 1);
                            }
                        }
                    }else{
                        //iterator = false;
                        this.mode = false;
                        break;
                    }
                }
            }
        }
    }
}

function neighborn(x, y, b){
    let neigh = [4];
    
    if(x < grid.lenght-1){
        if(!(grid[x+1][y].visit ^ !b)){
            neigh.push(0);
        }
    }
    if(x > 0){
        if(grid[x-1][y].visit ^ !b){
            neigh.push(1);
        }
    }
    if(y < grid[0].lenght-1){
        if(grid[x][y+1].visit ^ !b){
            neigh.push(2);
        }
    }
    if(y > 0){
        if(grid[x][y-1].visit ^ !b){
            neigh.push(3);
        }
    }
    return neigh;
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
    pen.iterator();
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
        grid[i][j] = {
            ex: false,
            ey: false,
            visit: false,
            unvist: false,
            color: colors[1],
        };
    }
}
grid[0][0].color=colors[2];

animation();