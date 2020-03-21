n = 5;
b = 0;
sec = {
    nome: "nada",
    img: "none.png",
};
var voto=0;
var r = true;
{
candidato = {};
candidato[0] = {
    nome: "Raposa vermelha",
    numero: 0,
    votos: 0,
    img: "redfox.png",
};
candidato[1] = {
    nome: "Raposa polar",
    numero: 0,
    votos: 0,
    img: "articfox.png",
};
candidato[2] = {
    nome: "Raposa swift",
    numero: 0,
    votos: 0,
    img: "swiftfox.png",
};
candidato[3] = {
    nome: "Raposa de corsac",
    numero: 0,
    votos: 0,
    img: "culpeofox.png",
};
candidato[4] = {
    nome: "Raposa prateada",
    numero: 0,
    votos: 0,
    img: "silverfox.png",
};
candidato[5] = {
    nome: "Raposa feneco",
    numero: 0,
    votos: 0,
    img: "fenneckfox.png",
};
}
{


function sell(){
    for(i=0;i<=n;i++){
        if(candidato[i].numero==voto){
            sec.nome=candidato[i].nome;
            sec.img=candidato[i].img;
            i=n;
        }else{
            sec.nome="nada";
            sec.img="none.png"
        }
        s1 = document.getElementById('visor');
        s1.alt=sec.nome;
        console.log(sec);
    }
}
function vot(v){
    rr=false;
    for(i=0;i<=n;i++){
        if(candidato[i].numero==v){
            candidato[i].votos++;
            console.log("votou em: "+candidato[i].nome);
            rr=true;
        }
    }
    return rr;
}
function oacnuf(nu){
    if (qnt(voto)<2) {
        voto=nu+10*voto;
        reflesh();
    }else{
        console.log("numero de caracteres excedido");
    }
    sell();
}
function reflesh(){
    console.log(voto);
}
function qnt(n){
    var s=true;
    var i=0;
    while (s){
        n=n/10;
        if (Math.trunc(n)<=0){s=false;}
        i++;
    }
    return i;
}

function fertig(){
    if(qnt(voto)==2){
        if(!vot(voto)){
            alert("esse candidato nâo existe");
        }
    }
    loschen();
}
function weiss(){
    if(qnt(voto)!=2){
        console.log("votou em branco!");
        b++;
    }else{console.log("apagado");}
    loschen();
}
function loschen(){
    voto=0;
    sell();
    reflesh();
    clear();
}
}
{
function div(id){
    if(id=="lista"){
        document.getElementById("lista").style.display = 'block';
        document.getElementById("result").style.display = 'none';
    }
    else if(id=="result"){
        document.getElementById("lista").style.display = 'none';
        document.getElementById("result").style.display = 'block';
    }else{
        document.getElementById("lista").style.display = 'none';
        document.getElementById("result").style.display = 'none';
    }
}
function clear(){
    var s1 = document.getElementById("lista");
    var s2 = document.getElementById("result");

    while (s1.firstChild) {
        s1.removeChild(s1.firstChild);
    }
    while (s2.firstChild) {
        s2.removeChild(s2.firstChild);
    }
    list();
}
function list(){
    var s1 = document.getElementById("lista");
    var l1 = document.createElement('p');
    var t1 = document.createTextNode("Candidatos");
    l1.appendChild(t1);
    s1.appendChild(l1);
    var s2 = document.getElementById("result");
    var l2 = document.createElement('p');
    var t2 = document.createTextNode("Votos");
    l2.appendChild(t2);
    s2.appendChild(l2);

    for(i=0;i<=n;i++){
        var l1 = document.createElement('p');
        var t1 = document.createTextNode(candidato[i].nome+" = "+candidato[i].numero);
        l1.appendChild(t1);
        s1.appendChild(l1);
        var l2 = document.createElement('p');
        var t2 = document.createTextNode(candidato[i].nome+" = "+candidato[i].votos);
        l2.appendChild(t2);
        s2.appendChild(l2);
    }
    var l2 = document.createElement('p');
    var t2 = document.createTextNode("brancos = "+b);
    l2.appendChild(t2);
    s2.appendChild(l2);
}
function random(){
    var rr = true;
    var nn = 0;
    for(i=0;i<=n;i++){
        nn=Math.round(10+89*Math.random());
        console.log(nn);
        rr=true;
        for(ii=0;ii<=n;ii++){
            if(candidato[ii].numero==nn){
                rr=false;
            }
        }
        if(rr){candidato[i].numero=nn}else{
            console.log("OPA!");
            i--;
        }
    }
}
}
random();
clear();
div("lista");
