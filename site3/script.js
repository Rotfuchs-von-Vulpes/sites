var va = [];
var n = 4;

function create(){
  for(i=0;i<=n-1;i++){
    va.push({
      value: 0,
      name: 0,
    })
  }
}

function clear(){
  var s1 = document.getElementById("div");

  while (s1.firstChild) {
      s1.removeChild(s1.firstChild);
  }
  list();
}

function list(){
  var s1 = document.getElementById("div")
  var l1 = document.createElement('p')
  var t1 = document.createTextNode("valores")

  for(i in va){
    var l1 = document.createElement('p')
    var t1 = document.createTextNode(va[i].name+" = "+va[i].value)
    l1.appendChild(t1)
    s1.appendChild(l1)
  }
}

function mother(){
  clear()
}

window.addEventListener("mousemove", (event) => {


  va[0].value = event.clientX
  va[0].name = "clientX"
  va[1].value = event.clientY
  va[1].name = "clientY"
  va[2].value = event.composed
  va[2].name = "composed"
  va[3].value = event.type
  va[3].name = "type"
})

setInterval(function () {
  mother();
}, 16)

create(3)