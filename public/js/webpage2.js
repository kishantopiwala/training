function changetab(tech) {
    let  i;
    let desc = document.getElementsByClassName("desc");
    for ( i = 0 ;i < desc.length; i++) {
        desc[i].style.display = "none";
    }
    let but = tech+"button";
    var butt = document.getElementsByClassName('tech');
    for (let j = 0; j < butt.length; j++) {
        butt[j].style.backgroundColor = '#F8FBFE';
    }
    document.getElementById(but).style.backgroundColor = "#F0F6FF"
    document.getElementById(tech).style.display = "block";
}
document.getElementById('wordpressbutton').click();


let sliderrowrow =  document.getElementById('sliderrow');
let dis = 200;
function scrollleft(){
    sliderrowrow.scrollBy(
        {
            left: -dis,
            behavior: "smooth"
        }
    )
}

function scrollright(){
    sliderrowrow.scrollBy(
        {
            left: dis,
            behavior: "smooth"
        }
    )
}