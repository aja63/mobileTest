const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');


import {player as player} from "./scripts.js";

export default class Bat{
	constructor(){
		this.x = Math.floor(Math.random()*1600+200);
		this.y = 100;
		this.w = 200;
		this.h = 100;
		
		this.img = new Image(200,100);
		this.img.src = "bat.png";
		
		this.speed = 7;
		
		this.action = new ActionHandle();
	}
	spawn(){
		let bat = this;
		this.action.swoopCheck();
		if(this.x > 1000){this.action.dir = "L"}else{this.action.dir = "R"};
		let spawning = setInterval(function(){
			bat.erase();
			bat.y+=10;
			bat.draw();
			if(bat.y == 400){clearInterval(spawning);bat.action.alive = true; bat.action.spawning = false}
		},50)
	}
	
	
	draw(){
		map.drawImage(this.img, this.x, this.y);
	}
	erase(){
		map.clearRect(this.x, this.y, this.w+50, this.h+50);
	}
	kill(){
		player.stats.kill();
		this.action.alive = false;
		this.img.src = "";
	}
	
	
	//called by main.js every second
	move(){
		if(this.action.alive == true){
			this.erase();
			switch(this.action.dir){
				case "L": this.moveLeft(); break;
				case "R": this.moveRight(); break;
			}
			if(this.action.swoop == true){this.y+=6}else if(this.y>400){this.y-=6};
			this.colMain();
			this.draw();
		}
	}
	
	//movement functions
	moveLeft(){
		if(this.x>0){this.x-=this.speed}else{this.action.dir = "R"};
	}
	moveRight(){
		if(this.x<1900){this.x+=this.speed}else{this.action.dir = "L"};
	}

	//main collison function
	colMain(){
		let hitbox = map.getImageData(this.x-1,this.y-1,this.w+50,this.h+50).data;
		let i = 3;
		while(i < hitbox.length){
			if(hitbox[i] != 0){
				if(hitbox[i-3] == 255 && hitbox[i-2] == 0 && hitbox[i-1] == 255){this.kill()};
				break;
			}
			i+=4;
		}
	}
	
	
}

class ActionHandle{
	constructor(){
		this.dir = "";
		this.stand = true;
		this.swoop = false;
		this.alive = false;
		this.spawning = true;
	}
	
	
	swoopCheck(){
		let act = this;
		setInterval(function(){act.swooping()},2000);
	}
	swooping(){
		let act = this;
		if(Math.random() > .5){this.swoop = true; setTimeout(function(){act.endSwoop()},400);}
	}
	endSwoop(){
		this.swoop = false;
	}
	
}