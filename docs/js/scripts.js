const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');
const mapW = mapActual.getBoundingClientRect().width;
const mapH = mapActual.getBoundingClientRect().height;

import Player from './player.js';
import Slime from './slime.js';



const player = new Player();
setTimeout(function(){player.draw()},500);




const bg = new Image(200,100);
bg.src = 'bg.png';
map.drawImage(bg,0,0);



let rate = 3000;
let enemies = 0;
const slimeList = [];

function spawnSlimes(){
	slimeList.push(new Slime());
	slimeList[enemies].spawn();
	enemies++;
}

setInterval(function(){spawnSlimes()},rate);



document.getElementById("left").addEventListener("mousedown", input);
document.getElementById("right").addEventListener("mousedown", input);
document.getElementById("jump").addEventListener("mousedown", input);

function input(){
	player.moveHandle(this.id);
}

function animation(){
	window.requestAnimationFrame(animation);
	player.move();
	for(const slime of slimeList){slime.move()};
}
window.requestAnimationFrame(animation);