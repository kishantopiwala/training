function onfocus_()
{
    document.getElementById('email').style.background = "yellow";
}

function fullscreen(){
    document.documentElement.mozRequestFullScreen();
}

function exitfullscreen(){
    document.documentElement.exitfullscreen();
}
function mouse_enter(){
    document.getElementById('b_year').style.background ="red";
}
function mouse_leave1(){
    document.getElementById('b_year').style.background = "white";
}
function mouse_hover(){
    document.getElementById('submit').style.scale = "2"
}
function mouse_leave(){
    document.getElementById('submit').style.scale = "1"
}
function mousewheel(){
    document.getElementById("table").style.width = "100%"
}
function drag_start(event) {
    event.dataTransfer.setData("Text", event.target.id);
}
function dragging(params) {
    document.getElementById("demo").innerHTML = "draging";

}
function allowDrop(event) {
    event.preventDefault()
}
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    document.getElementById("demo").innerHTML = "The element drag";
}
function mouse_down() {
    document.getElementById('mouse_down').style.backgroundColor = "black"
}
function mouse_up() {
    document.getElementById('mouse_up').style.backgroundColor = "green"
}
var counter = 0;
function mouse_move() {
    counter++;
    document.getElementById('mouse_move').innerText = counter;
    
}
function on_wheel() {
    document.getElementById('onwheel').style.fontSize = "35px"
}