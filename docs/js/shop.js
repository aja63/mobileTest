const txt = document.getElementById("debug");
import {player as player} from './main.js';



export default class Shop{
	constructor(){
		this.active = false;
		this.visits = 0;
		this.hpCost = 10;
		this.speedCost = 20;
		this.weaponCost = 20;
	}
	
	
	//create shop
	spawnShop(){
		this.active = true;
		
		let shop = document.createElement("div");
		shop.style.left = "150px"
		shop.className = "shop";
		shop.addEventListener("touchstart",this.buyHp);
		document.body.appendChild(shop);
		
		shop = document.createElement("div");
		shop.style.left = "600px"
		shop.className = "shop";
		shop.addEventListener("touchstart",this.buySpeed);
		document.body.appendChild(shop);
		
		shop = document.createElement("div");
		shop.style.left = "1050px"
		shop.className = "shop";
		shop.addEventListener("touchstart", this.buyWeapon);
		document.body.appendChild(shop);
		
		shop = document.createElement("div");
		shop.id = "leaveShop";
		document.body.appendChild(shop);
	}
	
	
	
	
	//buy methods, this returns div 
	buyHp(){
		txt.innerHTML += player.stats.gp;
		if(player.stats.gp >= 10*player.stats.hpbuys){
			player.stats.gp-=10*player.stats.hpbuys;
			player.stats.heal();
		}
	}
	buySpeed(){
		txt.innerHTML += "buy";
		if(player.stats.gp >= 20*player.stats.speedbuys){
			player.stats.gp-=20*player.stats.speedbuys;
			player.stats.speed++;
			player.weapon.speed++;
		}
	}
	buyWeapon(){
		txt.innerHTML += "buy";
		if(player.stats.gp >= 20*player.stats.weaponbuys){
			player.stats.gp-=20*player.stats.weaponbuys;
			player.weapon.w+=25;
		}
	}
	
	
	//close shop
	leaveShop(id){
		if(id="leaveShop"){	
			this.active = false;
			this.visits++;
			while(document.getElementsByClassName("shop").length != 0){
				document.getElementsByClassName("shop")[0].remove();
			}
			document.getElementById("leaveShop").remove();
		}
	}

}

