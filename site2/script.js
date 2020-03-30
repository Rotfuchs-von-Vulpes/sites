//variavaeis mecanicas do jogo
speed = 7;
level = 0;
score = 0;
fruits = [];
millisecond = 0;
second = 0;

player = {
    canScore: true,
    enemy: false,
    x: 465,
    y: 255,
};
NPC = {
    speed: 1,
    canScore: true,
    enemy: true,
    x: 18,
    y: 18,
    movingTo: undefined
}

//variaveis graficas
var canvas = document.getElementById('canvas');
if (canvas.getContext) {
    var foximg = document.getElementById("fox");
    var wolfimg = document.getElementById("wolf");
    var purplyimg = document.getElementById("purply");
    var ctx = canvas.getContext('2d');
}

function txt() {
    document.getElementById("x").innerHTML = "X = " + player.x;
    document.getElementById("y").innerHTML = "Y = " + player.y;
    document.getElementById("p").innerHTML = "Score = " + score;
    document.getElementById("m").innerHTML = "Seconds = " + second;
    document.getElementById("s").innerHTML = `Milliseconds = ${millisecond}`;
    document.getElementById("debug").innerHTML = `debug = ${NPC.movingTo}`;

}

function spr(img, x, y) {
    ctx.drawImage(img, x - 15, y - 15, 30, 30);
}

function createFruit(x, y) {
    fruits.push({
        x: x,
        y: y,
    })
}

function resetNPCPath() {
    let targets = fruits.slice()
    while (targets.length > 1) {
        if (radialDistance(NPC, targets[0]) >= radialDistance(NPC, targets[targets.length - 1])) {
            targets.shift()
        } else {
            targets.pop()
        }
    }
    NPC.movingTo = targets[0]
}

function removeFruit(f) {
    fruits.splice(f, 1);

    f = undefined
    let targets = fruits.slice()
    resetNPCPath()

}

function distance2D(obj1, obj2) {
    let x = obj1.x - obj2.x
    let y = obj1.y - obj2.y
    return { x, y }
}

function radialDistance(obj1, obj2) {
    x = distance2D(obj1, obj2).x
    y = distance2D(obj1, obj2).y
    res = (x ** 2 + y ** 2) ** 0.5
    return res
}

function move(obj, x, y) {
    obj.x += x;
    obj.y += y;
    if (obj.canScore) {
        for (i = 0; i <= fruits.length - 1; i++) {
            if (radialDistance(obj, fruits[i]) <= 25) {
                removeFruit(i);
                if (obj.enemy) {
                    score--;
                } else {
                    score++
                }
            };
        }
    }
}

function free(x) {
    var r = true;

    if (x == "+x" && player.x <= 750 - 15 - speed) { r = false; }
    else if (x == "-x" && player.x >= 0 + 15 + speed) { r = false; }
    else if (x == "+y" && player.y <= 500 - 15 - speed) { r = false; }
    else if (x == "-y" && player.y >= 0 + 15 + speed) { r = false; }
    return !r;
}

function teleport(obj, x, y) {
    obj.x = x;
    obj.y = y;
}

function check(x, y) {
    var r = true;
    for (i = 1; i <= fruits.length - 1; i++) {
        if (radialDistance(i, { x, y }) <= 40 && radialDistance(player, x, y) <= 40) { r = false; }
    }
    return r;
}

function random(r) {
    var x = 0;
    var y = 0;
    var i = 0;

    while (i < r) {
        x = 15 + 720 * Math.random();
        y = 15 + 470 * Math.random();
        if (check(x, y)) {
            createFruit(x, y);
            i++;
        }
    }
    resetNPCPath()
}

function TIC() {

    //document.onkeydown = applyKey;
    millisecond = millisecond + 1;
    if (millisecond >= 60) {
        second++;
        millisecond = 0;
    }

    if (fruits.length == 0) {
        level++;
        random(4 + level);
        NPC.movingTo = fruits[0]
    }

    function drawgame() {
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, 750, 500);
        spr(foximg, player.x, player.y);
        spr(wolfimg, NPC.x, NPC.y);

        for (i = 0; i <= fruits.length - 1; i++) {
            spr(purplyimg, fruits[i].x, fruits[i].y);
        }
    }

    let dir = { x, y }

    if (distance2D(NPC, NPC.movingTo).x > 0) {
        dir.x = -NPC.speed
    } else if (distance2D(NPC, NPC.movingTo).x < 0) {
        dir.x = NPC.speed
    } else { dir.x = 0 }

    if (distance2D(NPC, NPC.movingTo).y > 0) {
        dir.y = -NPC.speed
    } else if (distance2D(NPC, NPC.movingTo).y < 0) {
        dir.y = NPC.speed
    } else { dir.y = 0 }

    move(NPC, dir.x, dir.y)

    drawgame();
    txt();

}

setInterval(function () {
    TIC();
}, 16)

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            if (free("+y")) { move(player, 0, speed); }
            break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            if (free("-y")) { move(player, 0, -speed); }
            // Do something for "up arrow" key press.
            break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            if (free("-x")) { move(player, -speed, 0); }
            // Do something for "left arrow" key press.
            break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            if (free("+x")) { move(player, speed, 0); }
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