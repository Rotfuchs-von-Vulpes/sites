//variavaeis mecanicas do jogo
player = {
    x: 465,
    y: 255,
};
v=7;
level=0;
score=0;
n=0;
fruit = {};
t=false;
time = 0;
times = 0;

//variaveis graficas
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
    var foximg = document.getElementById("fox");
    var wolfimg = document.getElementById("wolf");
    var purplyimg = document.getElementById("purply");
    var ctx = canvas.getContext('2d');
}

setInterval(function () {
    TIC();
}, 16)

function text(string, x1, y1){

}
function squad(x1, y1, x2, y2, scolor){
    ctx.lineStyle = 'white';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
function line(x1, y1, x2, y2, scolor){
    ctx.fillStyle(scolor);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function spr(img, px, py){
    ctx.drawImage(img, px, py, 30, 30);
}
function rect(x1, y1, x2, y2, scolor){
    ctx.fillStyle = scolor;
    ctx.fillRect(x1,y1,x2,y2);
}
function txt(){
    document.getElementById("x").innerHTML = "X = " + player.x;
    document.getElementById("y").innerHTML = "Y = " + player.y;
    document.getElementById("p").innerHTML = "Score = " + score;
    document.getElementById("m").innerHTML = "T = " + time;
    document.getElementById("s").innerHTML = "T(s) = " + times;
}
function fruits(){
    for(i=1;i<=n;i++){
        spr(purplyimg,fruit[i].x-15,fruit[i].y-15);
    }
}

function remove(r){
    var i = 0;
    for(i=r;i<=n;i++){
        if(i!=n){
            fruit[i] = {
                x: fruit[(i+1)].x,
                y: fruit[(i+1)].y,
            };
        }else{
            delete fruit[n].x;
            delete fruit[n].y;
            n--;
        }
    }
}
function add(x1,y1){
    n++;
    fruit[n] = {
        x: x1,
        y: y1,
    };
}
function check(x1,y1){
    var r=true;
    for(i=1;i<=n;i++){
        if(distance(i,false,x1,y1)<=40 && ptgs(player.x,player.y,x1,y1)<=40){r=false;}
    }
    return r;
}
function random(r){
    var x1=0;
    var y1=0;
    var i=0;

    while(i<=r){
        x1=15+720*Math.random();
        y1=15+470*Math.random();
        if(check(x1,y1)){
            add(x1,y1);
            i++;
        }
    }
}
function distance(id1,r,x1,y1){
    var d = 0;

    if (r){
        d=ptgs(fruit[id1].x,fruit[id1].y,player.x,player.y);
    }else{
        d=ptgs(fruit[id1].x,fruit[id1].y,x1,y1);
    }
    return d;
}
function ptgs(x1,y1,x2,y2){
    return ((x1-x2)**2+(y1-y2)**2)**0.5;
}
function free(x1){
    var r=true;

    if(x1=="+x" && player.x<=750-15-v){r = false;}
    else if(x1=="-x" && player.x>=0+15+v){r = false;}
    else if(x1=="+y" && player.y<=500-15-v){r = false;}
    else if(x1=="-y" && player.y>=0+15+v){r = false;}
    return !r;
}
function move (mx,my){
    player.x=player.x+mx;
    player.y=player.y+my;
    for(i=1;i<=n;i++){
        if(distance(i,true)<=25){
            remove(i);
            score++;
        };
    }
}

function TIC(){

    //document.onkeydown = applyKey;
    time=time+1;
    if(time>=60){
        times++;
        time=0;
    }

    if(n==0){
        level++;
        random(4+level);
    }

    function drawgame() {
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, 750, 500);
        fruits();
        spr(foximg, player.x-15, player.y-15);

}

    drawgame();
    txt();

    }
    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      
        switch (event.key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown":
                if(free("+y")){move(0,v);}
                break;
            case "Up": // IE/Edge specific value
            case "ArrowUp":
                if(free("-y")){move(0,-v);}
                // Do something for "up arrow" key press.
                break;
            case "Left": // IE/Edge specific value
            case "ArrowLeft":
                if(free("-x")){move(-v,0);}
                // Do something for "left arrow" key press.
                break;
            case "Right": // IE/Edge specific value
            case "ArrowRight":
                if(free("+x")){move(v,0);}
                // Do something for "right arrow" key press.
                break;
            case "Enter":
                // Do something for "enter" or "return" key press.
                break;
            case "Esc": // IE/Edge specific value
            case "Escape":
                // Do something for "esc" key press.
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);