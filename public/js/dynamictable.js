function on_blur(){
    let x = document.getElementById("e2");
  x.value = x.value.toUpperCase();
}

function on_before_unload(){
    // alert('Sure you want ot exit this page')
    return "Sure you want ot exit this page";
}

document.getElementById('addcolumn').addEventListener('click',addcolumn);
function addcolumn(){

    const rows =  document.getElementsByName("row");
    for (i = 0; i < rows.length; i++) {
        const col = document.createElement("td");
        col.setAttribute("name","col")
        document.getElementsByName("row")[i].appendChild(col);
        // row[i].innerHTML += "<td name='col'>"
     }
}
document.getElementById('addrow').addEventListener('click',addrow);

function addrow(){
    const cols = document.getElementsByName("col");
    const rows = document.getElementsByName("row");
    const table = document.getElementById("table");
    const row = document.createElement("tr");
    row.setAttribute("name","row")
    for(i = 0;i<=(cols.length/rows.length);i++){
        const col = document.createElement("td");
        col.setAttribute("name","col")
        row.appendChild(col)
    }
    table.appendChild(row);     
}
document.getElementById('removerow').addEventListener('click',removerow);
function removerow(){
    const rows  = document.getElementsByName("row")
    if(rows.length > 2){
        document.getElementById('table').lastChild.remove()
    } 
}

document.getElementById('removecol').addEventListener('click',removecol);
function removecol(){
    const cols  = document.getElementsByName("col")
    const rows = document.getElementsByName("row")
    console.log(rows[0].children.length)
    if(rows[0].children.length > 2){
        for(i = 0;i<rows.length;i++){
            document.getElementsByName("row")[i].lastChild.remove();
        }
    } 
}

