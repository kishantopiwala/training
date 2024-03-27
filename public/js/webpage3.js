var slideindex = 1;
var contents = document.getElementsByClassName('content');
var j;
document.getElementById('content1').click();
for (var i in contents) {
    contents[j].style.display = "none"
}
function changeleft() {
    for ( j in contents) {
        console.log(j)
        contents[j].style.display = "none"
        contents[j + 1].style.display = "block"
    }
}

function changeright() {
    for (var j in contents) {
        console.log(j)
        contents[j].style.display = "none"
        contents[j + 1].style.display = "block"
    }
}
