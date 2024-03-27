var randomcolumn;
var score = 0;
var randomcolor1;
let maxvalue = 0xFFFFFF;
    var random = Math.random() * maxvalue;
    random = Math.floor(random)
    randomcolor1 = random.toString(16)
    randomcolor1 = randomcolor1.padStart(6, 0)

function wrongclick(){
    score-=1;
    document.getElementById('score').innerHTML = score;
    alert("wrong click");

}
function randomcol() {
    const cols = document.getElementsByClassName('col');
    console.log("total columns"+cols.length)
    randomcolumn = Math.floor(Math.random() * cols.length);
    console.log("random column " + randomcolumn);
    // console.log(randomcolor1)
    document.getElementsByClassName('col')[randomcolumn].setAttribute("style", "background-color:#"+randomcolor1+"a1");
    // document.getElementsByClassName('col')[randomcolumn].setAttribute("style", "opacity:0.5");
    document.getElementsByClassName('col')[randomcolumn].setAttribute("onclick","tableincrease()");
    score+=1;
    document.getElementById('score').innerHTML = score;
}
function randomcolor() {
    const cols = document.getElementsByClassName('col');
    let maxvalue = 0xFFFFFF;
    var random = Math.random() * maxvalue;
    random = Math.floor(random)
    randomcolor1 = random.toString(16)
    randomcolor1 = randomcolor1.padStart(6, 0)
    // console.log("random color " + randomcolor1)
    for (i = 0; i < cols.length; i++) {
        document.getElementsByClassName('col')[i].setAttribute("style", "background-color:#" + randomcolor1)
    }
    randomcol();
}

randomcolor();
function tableincrease() {
     document.getElementsByClassName('col')[randomcolumn].removeAttribute("onclick","tableincrease()")
    // console.log("pressed")
    const rows = document.getElementsByClassName("row");
    // console.log('Total Row = '+rows.length);
    for (i = 0; i < rows.length; i++) {
        const col = document.createElement("td");
        col.setAttribute("name", "col")
        col.setAttribute("class", "col")
        col.setAttribute("onclick","wrongclick()")
        // col.setAttribute("onclick","tableincrease()")
        document.getElementsByClassName("row")[i].appendChild(col);
    }

    const cols = document.getElementsByClassName('col');
    const table = document.getElementById("table");
    const row = document.createElement("tr");
    row.setAttribute("name", "row")
    row.setAttribute("class", "row")
    // console.log("Row length "+rows.length)
    // console.log("col length "+cols.length)

    for (i = 0; i < (cols.length / rows.length); i++) {
        const col = document.createElement("td");
        col.setAttribute("name", "col")
        col.setAttribute("class", "col")
        col.setAttribute("onclick","wrongclick()")
        // col.setAttribute("onclick","tableincrease()")
        row.appendChild(col)
    }
    table.appendChild(row)
    randomcolor();
}

var second = 10;  
var inter = setInterval(timer,1000)
function timer(){
    second = second -1;
    document.getElementById('timer').innerHTML = second;
    if(second == 0){
        alert("game Over")
        document.getElementById('table').remove();
        clearInterval(inter)

    }
}