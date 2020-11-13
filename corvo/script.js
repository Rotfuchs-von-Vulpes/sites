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

function newObject(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
}

var corvo = new newObject(200, 200, 10);
var obstacles = [];
var tic = 0;
var speed = 25;

corvo.r = 30;
corvo.draw = function(){
    ctx.beginPath();
    ctx.moveTo(200, this.y);
    ctx.arc(200, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
}
corvo.move = function(dy){
    this.y += dy * this.speed;
}

function random(a, b){
    return Math.random() * a + b;
}

function newPlataform(q){
    for(i=0; i<q; i++){
        let plataform = new newObject(w.x, 100 * random(w.y/100, 0), 10);
    plataform.height = 100 * random(9, 1);
    plataform.draw = function(){
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.height, 50);
    }
    plataform.move = function(dx){
        this.x += dx * speed;
    }
    obstacles.push(plataform);
    }
}

newPlataform(1);

function gameOver(){
    corvo.y = 100;
    speed = 25;
    obstacles = [];
    newPlataform(1);
}

function TIC(){
    ctx.clearRect(0, 0, w.x, w.y);

    tic++;
    if(tic%180 == 0){
        speed++;
    }

    for(i in obstacles){
        let plataform = obstacles[i];
        plataform.draw();
        plataform.move(-1);
        if(plataform.x + plataform.height < 0){
            obstacles.splice(i, 1);
            newPlataform(1);
        }
        if(plataform.x <= corvo.x - corvo.r && plataform.x + plataform.height >= corvo.x + corvo.r){
            if(plataform.y + 50 >= corvo.y - corvo.r && plataform.y <= corvo.y + corvo.r){
                gameOver();
                console.log("hurra");
            }
            
        }
    }

    corvo.draw();
    
    if (pressed("ArrowUp")) {
        corvo.move(-1);
    } else if (pressed("ArrowDown")) {
        corvo.move(1);
    }
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