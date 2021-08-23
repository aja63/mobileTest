const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');

import Knight from "./knight.js";
import Slime from "./slime.js";
import Bat from "./bat.js";
import Shop from "./shop.js";




//player functions
export const player = new Knight();
setInterval(player.checkDeath, 10);




//slime spawning functions
let slimeList = [];
let slimeCount = 0;
function spawnSlime(){
	slimeList.push(new Slime());
}

//bat spawning function
let batList = [];
let batCount = 0;
function spawnBat(){
	batList.push(new Bat());
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
let rate = 1000;

function spawnEnemy(){
	if(game == true){	
		spawnSlime()
		if(player.stats.exp>200){spawnSlime()};
		if(player.stats.exp>500 && shop.visits < 1 && shop.active == false){game = false; shop.spawnShop(); document.getElementById("leaveShop").addEventListener("mousedown", leaveShop)};
		if(player.stats.exp>500){spawnSlime()};
		if(player.stats.exp>700){spawnBat()};
		if(player.stats.exp>1000 && shop.visits < 2 && shop.active == false){game = false; shop.spawnShop(); document.getElementById("leaveShop").addEventListener("mousedown", leaveShop)};
		if(player.stats.exp>1200){spawnSlime()};
		if(player.stats.exp>1400){spawnBat()};
		if(player.stats.exp>1500 && shop.visits < 3 && shop.active == false){game = false; shop.spawnShop(); document.getElementById("leaveShop").addEventListener("mousedown", leaveShop)};
		if(player.stats.exp>3000){alert('win')};
	}
}
setInterval(spawnEnemy,rate);






//player inputs
document.getElementById("left").addEventListener("mousedown", input);
document.getElementById("right").addEventListener("mousedown", input);
document.getElementById("jump").addEventListener("mousedown", input);


function input(){
	player.moveHandle(this.id);
}



//main animation function 
function animation(){
	window.requestAnimationFrame(animation);
	if(game == true){player.move()};
	if(game == true){for(let slime of slimeList){slime.move()}};
	if(game == true){for(let bat of batList){bat.move()}};
}
window.requestAnimationFrame(animation);