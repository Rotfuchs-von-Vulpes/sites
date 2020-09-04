const game = {
    d: document.getElementById("game"),
    game: true,
    table: [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]],
    symbols: ["X", "O"],
    player: 0,
    init: function(){
        this.game = true;
        for(i in this.table){
            for(j in this.table[i]){
                this.table[i][j] = "_";
            }
        }
        this.draw();
    },
    draw: function(){

        //dois for passa por todas as casas de "table"
        for(i in this.table){
            for(j in this.table[i]){
                let ID = i + j;
                //console.log(i + " " + j + "=" + ID);
                let d = document.getElementById(ID)
                let p = this.table[i][j]
                d.innerHTML = p;
                if(p === this.symbols[0]){
                    d.color = "red";
                }else if(p === this.symbols[1]){
                    d.color = "green";
                }else{
                    d.color = "black";
                }
                //escreve o valor de "table" em cada div
            }
        }
    },
    play: function(d){
        //"d" é o elemento que chama "play"

        let x = d.id[0];//primeiro caractere do id
        let y = d.id[1];//segundo caractere do id

        if(this.table[x][y] === "_" && this.game){
            //se a casa estiver limpa e o jogo continua então escrever
            this.table[x][y] = this.symbols[this.player];//escrever
            
            let r = this.lineVerific(x, y);
            if(r){
                this.game = false;
            }
            if(this.game){
                if(this.player === 0){
                    this.d.innerHTML = "player 2";
                    this.player = 1;
                }else{
                    this.d.innerHTML = "player 1";
                    this.player = 0;
                }//altenar jogador
            }else{
                this.d.innerHTML = "player "+(this.player + 1)+" ganhou!"
            }
            
            console.log(r);
            this.draw();//desenhar
        }
        //gambiarra linda
    },
    verific: function(a){
        //verificar se todos os elementos de uma array são iguais
        console.log("verificando!")

        let r = a[0];
        for(i in a){
            if(r != a[i]){
                return false;
            }
        }
        return true;
    },
    lineVerific: function(x, y){
        x = +x;
        y = +y;

        if(this.verific(this.table[x])){
            return true;
        }//verificar uma linha

        let j = []
        for(i=0; i<=2; i++){
            j[i] = this.table[i][y];
        }
        if(this.verific(j)){
            return true;
        }//verificar uma coluna

        if(x === y){
            let j = [];
            for(i=0; i<=2; i++){
                j[i] = this.table[i][i];
                console.log(j[i]);
            }
            if(this.verific(j)){
                return true;
            }
        }//verificar uma diagonal

        if((x + y) === 2){
            let j = [];
            for(i=0; i<=2; i++){
                j[i] = this.table[i][2 - i];
                console.log(j[i]);
            }
            if(this.verific(j)){
                return true;
            }
        }//verifiar a outra diagonal

        return false;
    }
}

game.draw();