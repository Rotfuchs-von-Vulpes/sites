const w = {
    x: window.innerWidth - 7,
    y: window.innerHeight - 7,
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = w.x;
canvas.height = w.y;

let inputs = {
    "ArrowUp": { "pressed": false, "handled": false },
    "ArrowDown": { "pressed": false, "handled": false },
}

function random(a, b){
    return Math.random() * a + b;
}

function newObject(x, y){
    this.x = x;
    this.y = y;
}

var corvo = new newObject(200, random(w.y-this.r, this.r));
var column = [];
var width = Math.floor(w.y/50);
var tic = 0;
var speed = 5;
var score = 0;

corvo.r = 49;
corvo.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.r, this.r);
    ctx.fillStyle = "black";
    ctx.fill();
}
corvo.move = function(dy){
    if(corvo.y+speed*dy >= 0 && corvo.y+speed*dy <= width * 50){
        this.y += dy * speed;
    }
}

function gameOver(){
    corvo.y = random(w.y - corvo.r, corvo.r);
    speed = 5;
    score = 0;
    column = [];
    newPlataform(3);
    newCoin(2);
}

function newPlataform(q){
    //console.log("nova plataforma")
    for(i=0; i<q; i++){
        let resp = Math.round(random(width, 0)); 
        while(column[resp] != undefined){
            resp = Math.round(random(width, 0));
        }
        let plataform = new newObject(w.x, 50 * resp);
        plataform.id = "plataform";
        plataform.height = 100 * random(9, 1);
        plataform.draw = function(){
            ctx.beginPath();
            ctx.fillRect(this.x - 1, this.y - 1, this.height - 1, 49);
        }
        plataform.move = function(dx){
            this.x += dx * speed;
        }
        plataform.collision = function(){
            gameOver();
        }
        column[resp] = plataform;
    }
}

function newCoin(q){
    for(i=0; i<q; i++){
        let resp = Math.round(random(width, 0)); 
        while(column[resp] != undefined){
            resp = Math.round(random(width, 0));
        }
        let coin = new newObject(w.x, 50 * resp);
        coin.id = "coin";
        coin.height = 50;
        coin.draw = function(){
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.fillRect(this.x - 1, this.y - 1, this.height - 1, 49);
            ctx.fillStyle = "black";
        }
        coin.move = function(dx){
            this.x += dx * speed;
        }
        coin.collision = function(){
            newCoin(1);
            score++;
        };
        column[resp] = coin;
    }
}

gameOver();

function TIC(){
    ctx.clearRect(0, 0, w.x, w.y);
    tic++;
    if(tic%180 == 0){
        speed++;
    }

    for(j in column){
        if(column[j] != undefined){
            let plataform = column[j];
            plataform.draw();
            plataform.move(-1);
            if(plataform.x + plataform.height < 0){
                column[j] = undefined;
                switch (plataform.id) {
                    case "plataform":
                        newPlataform(1);
                        break;
                    case "coin":
                        newCoin(1);
                        break;
                }
                //console.log("deletar")
            }
            if(plataform.x <= corvo.x + corvo.r && plataform.x + plataform.height >= corvo.x + corvo.r){
                //console.log("shit");
                if(plataform.y <= corvo.y + corvo.r && plataform.y + 50 >= corvo.y){
                    console.log(j);
                    plataform.collision();
                    column[j] = undefined;
                }
            }
        }
    }

    corvo.draw();
    
    if (pressed("ArrowUp")) {
        corvo.move(-1);
    } else if (pressed("ArrowDown")) {
        corvo.move(1);
    }
    ctx.fillText("score: "+score, 10, 10);
}

window.addEventListener("keydown", (event) => {
    inputs[event.key].pressed = true;
    inputs[event.key].handled = false;
})

window.addEventListener("keyup", (event) => {

    inputs[event.key].pressed = false;
})

function pressed(button) {
    return inputs[button].pressed;
}

function just_pressed(button) {
    temp = !inputs[button].handled;
    inputs[button].handled = false;
    return temp;
}

setInterval(() => {
    TIC();
}, 16)