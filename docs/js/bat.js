const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');

import ActionHandle from './actionHandle.js';
import {player as player} from './main.js';

export default class Bat{
	constructor(){
		this.x = Math.floor(Math.random()*1600+200);
		this.y = -20;
		this.w = 100;
		this.h = 60;
		
		this.act = new ActionHandle();
		this.act.spawn = true;
		this.jumpTimer = 0;
		this.jumpFreq = Math.floor(Math.random()*300+100);
		
		this.speed = 4;
		this.alive = true;
		
		this.img = new Image(200,100);
		this.img.src = "bat.png";
		
		this.coin = new Coin();	
	}
	
	//basic functions
	draw(){
		if(this.alive == true){this.collision()};
		map.drawImage(this.img,this.x,this.y);
	}
	
	erase(){
		map.clearRect(this.x-1,this.y-1, this.w+2, this.h+2);
	}
	
	kill(){
		this.alive = false;
		let bat = this;
		setTimeout(function(){bat.erase()},10);
		player.stats.gainExp(50);
		this.coin.spawn(this.x);
	}
	
	//move functions
	move(){
		if(this.alive == true){
			this.collision();
			this.erase();
			if(this.act.spawn == true){this.moveDown(); this.act.spawning(this.y,200,this.x)};
			this.swap();
			switch(this.act.dir){
				case "L" : this.moveLeft(); break;
				case "R" : this.moveRight(); break;
			}
			if(this.jumpTimer > this.jumpFreq){this.act.jumped(); this.jumpTimer = 0}else{this.jumpTimer++};
			if(this.act.jump == "jumping"){this.moveDown()};
			if(this.act.jump == "falling"){this.moveUp()};
			this.draw();
		}
	}
	moveLeft(){
		this.x-=this.speed;
	}
	moveRight(){
		this.x+=this.speed;
	}
	moveUp(){
		this.y-=this.speed;
	}
	moveDown(){
		this.y+=this.speed;
	}
	
	swap(){
		if(this.x>1000-this.w){this.act.dir = "L"};
		if(this.x<0){this.act.dir = "R"};
	}
	
	//collison functions
	collision(){
		let hitbox = map.getImageData(this.x-1,this.y-1,this.w+2,this.h+2).data;
			let i = 3;
			while(i < hitbox.length){
				if(hitbox[i] != 0){
					this.checkCol(hitbox[i-3],hitbox[i-2],hitbox[i-1]);
					break;
				}
				i+=4;
			}
	}
	
	checkCol(r,g,b){
		if(r == 220 && g == 20 && b == 210){this.kill()};
		
	}
	
}






class Coin{
	constructor(){
	}
	spawn(where){
		let x = where;
		setTimeout(function(){map.fillStyle = "rgb(171, 142, 5)"; map.fillRect(x,200,20,20)},300);
	}
}