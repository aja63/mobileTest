document.getElementById("left").addEventListener("touchstart", press);
document.getElementById("mid").addEventListener("touchstart", press);
document.getElementById("right").addEventListener("touchstart", press);

function press(){
    switch(this.id){
        case "left": alert('this.id'); break;
        case "mid":  alert('this.id'); break;
        case "right": alert('this.id'); break;
}
