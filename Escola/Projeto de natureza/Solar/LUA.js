var tic = 0;

function draw(){
    //ctx.fillRect(0, 0, 800, 400);
    cano([[7, 1], [7, 13], [31, 1]], 'red');

    caixa(1, 1, "origem1", "blue");
    caixa(1, 13, "origem2", "blue");
    caixa(25, 1, "gerador", "blue");
    caixa(49, 1, "casas", "blue");
}

draw();