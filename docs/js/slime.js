const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');


import {player as player} from "./scripts.js";


export default class Slime{
	constructor(){
		this.x = Math.floor(Math.random()*1900)+100;
		this.y = 900;
		this.w = 100;
		this.h = 100;
		this.img = new Image(100,100);
		this.img.src = "slime.png";
		
		
		this.coin = new Coin();
		this.action = new ActionHandle();
		this.speed = 3;
	}
	//spawn function
	spawn(){
		let slime = this;
		this.action.jumpCheck();
		if(this.x > 1000){this.action.dir = "L"}else{this.action.dir = "R"};
		let spawning = setInterval(function(){
			slime.erase();
			slime.y-=10;
			slime.draw();
			if(slime.y == 800){clearInterval(spawning);slime.action.alive = true; slime.action.spawning = false}
		},50)
	}
	
	//basic functions
	draw(){
		map.drawImage(this.img,this.x,this.y);
	}
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
	}
	kill(){
		this.action.alive = false;
		this.img.src = "";
		player.stats.kill();
		this.coin.spawn(this.x);
	}
	
	//called by main.js every second
	move(){
		if(this.action.alive == true){
			this.erase();
			switch(this.action.dir){
				case "L": this.moveLeft(); break;
				case "R": this.moveRight(); break;
			}
			if(this.action.jump == true){this.y-=6}else if(this.y<800){this.y+=6};
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
		let hitbox = map.getImageData(this.x,this.y,this.w,this.h).data;
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
		this.jump = false;
		this.alive = false;
		this.spawning = true;
	}
	
	
	jumpCheck(){
		let act = this;
		setInterval(function(){act.jumping()},2000);
	}
	jumping(){
		let act = this;
		if(Math.random() > .5){this.jump = true; setTimeout(function(){act.endJump()},400);}
	}
	endJump(){
		this.jump = false;
	}
	
}

class Coin{
	constructor(){
	}
	spawn(xo){
		let x = xo;
		setTimeout(function(){map.fillStyle = "rgb(186,193,51)"; map.fillRect(x, 700, 25,25)}, 1000);
	}
}