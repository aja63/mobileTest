document.getElementById("left").addEventListener("touchstart", press);
document.getElementById("mid").addEventListener("touchstart", press);
document.getElementById("right").addEventListener("touchstart", press);

function press(){
    alert('you pressed' + this);
}
