const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');

import Knight from "./knight.js";
import Slime from "./slime.js";
import Shop from "./shop.js";




//player functions
export const player = new Knight();
setInterval(player.checkDeath, 10);




//slime spawning functions
let slimeList = [];
let slimeCount = 0;
let rate = 1000;
function spawnSlime(){
	slimeList.push(new Slime());
}



//shop functions
const shop = new Shop();

function leaveShop(){
	txt.innerHTML +=1;
	shop.leaveShop(this.id);
	game = true;
}

//main spawner and game handle function
let game = true;

function spawnEnemy(){
	if(game == true){	
		spawnSlime()
		if(player.stats.exp>200){spawnSlime()};
		if(player.stats.exp>600 && shop.visits < 1 && shop.active == false){game = false; shop.spawnShop(); document.getElementById("leaveShop").addEventListener("touchstart", leaveShop)};
		if(player.stats.exp>500){spawnSlime(); rate = 750};
		if(player.stats.exp>700){spawnSlime(); rate = 500};
		if(player.stats.exp>1000){alert('win')};
	}
}
setInterval(spawnEnemy,rate);






//player inputs
document.getElementById("left").addEventListener("touchstart", input);
document.getElementById("right").addEventListener("touchstart", input);
document.getElementById("jump").addEventListener("touchstart", input);


function input(){
	player.moveHandle(this.id);
}



//main animation function 
function animation(){
	window.requestAnimationFrame(animation);
	if(game == true){player.move()};
	if(game == true){for(let slime of slimeList){slime.move()}};
}
window.requestAnimationFrame(animation);
