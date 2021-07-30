document.getElementById("left").addEventListener("mousedown", press);
document.getElementById("mid").addEventListener("touchstart", press);
document.getElementById("right").addEventListener("touchstart", press);

function press(){
    switch(this.id){
        case "left": alert(this.firstChild.style.left); break;
        case "mid":  alert(this.firstChild.style.left); break;
        case "right": alert(this.firstChild.style.left); break;
    }
}
