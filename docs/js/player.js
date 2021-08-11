const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');

export default class Player{
	constructor(){
		this.x = 900;
		this.y = 700;
		this.w = 100;
		this.h = 200;
		this.img = new Image(100,200);
		this.img.src = 'playerR.png';
		
		this.action = new ActionHandle();
		this.weapon = new Weapon();
		
		this.stats = new Statbook();
	}
	
	//basix fuctions
	draw(){
		map.drawImage(this.img,this.x,this.y);
		this.weapon.draw();
	}
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
		this.weapon.erase();
	}
	damage(){
		if(this.action.damage == false){
			if(this.stats.damage() == true){
				this.action.damageCD();
			}else{this.kill()};
		}
	}
	kill(){
		alert("dead");
	}
	
	
	//called on input in main.js
	moveHandle(dir){
		switch(dir){
			case "left": this.weapon.flip("L"); this.action.dir = "L"; break;
			case "right":this.weapon.flip("R"); this.action.dir = "R"; break;
			case "jump": if(this.action.stand == true){this.action.jump = true; this.action.stopJump()}; break;
		}
	}
	//called by main.js every second
	move(){
		this.erase();
		switch(this.action.dir){
			case "R" : this.moveRight(); break;
			case "L" : this.moveLeft(); break;
			case "": break;
		}
		if(this.action.jump == true){this.y-=3; this.weapon.y-=3}else if(this.y<700){this.y+=3; this.weapon.y+=3};
		this.colMain();
		this.draw();
	}
	//base movement
	moveRight(){
		if(this.x<1900){this.x+=this.stats.speed; this.weapon.moveRight()};
	}
	moveLeft(){
		if(this.x>0){this.x-=this.stats.speed; this.weapon.moveLeft()};
	}
	
	
	//main collision handler
	colMain(){
		let hitbox = map.getImageData(this.x,this.y,this.w,this.h).data;
		let i = 3;
		while(i < hitbox.length){
			if(hitbox[i] != 0){
				if(hitbox[i-3] == 255 && hitbox[i-2] == 150 && hitbox[i-1] == 171){this.damage()};
				if(hitbox[i-3] == 186 && hitbox[i-2] == 193 && hitbox[i-1] == 51){this.stats.addGold()}; 
				break;
			}
			i+=4;
		}
	}
	
	
	//for debuggering
	test(){
		txt.innerHTML += this;
	}
	
}

class ActionHandle{
	constructor(){
		this.dir = "";
		this.stand = true;
		this.jump = false;
		this.attack = false;
		this.damage = false;
	}
	//set dif actions to true for checks
	stopJump(){
		this.jump = true;
		this.stand = false;
		let act = this;
		setTimeout(function(){act.jump = false},600);
		setTimeout(function(){act.stand = true}, 1400);
	}
	
	damageCD(){
		this.damage = true;
		let act = this;
		setTimeout(function(){act.damage = false},500);
	}
	
}

class Weapon{
	constructor(){
		this.x = 1000;
		this.y = 800;
		this.w = 100;
		this.h = 50;
		this.img = new Image(100,50);
		this.speed = 5;
		this.dir = "R";
	}
	draw(){
		map.fillStyle = "rgb(255,0,255)";
		map.fillRect(this.x,this.y,this.w,this.h);
	}
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
	}
	moveLeft(){
		this.x-=this.speed;
	}
	moveRight(){
		this.x+=this.speed;
	}
	flip(dir){
		if(dir != this.dir){
			switch(dir){
				case "L": this.dir = "L"; this.erase(); this.x-=200; break;
				case "R": this.dir = "R"; this.erase(); this.x+=200; break;
			}
		}
	}

	
}

class Statbook{
	constructor(){
		this.hp = 100;
		this.speed = 5;
		this.exp = 0;
		this.gp = 10;
	}
	
	damage(){
		this.hp-=10;
		this.drawHp();
		if(this.hp<=0){return false}else{return true};
	}
	
	drawHp(){
		map.fillStyle = 'red';
		map.fillRect(1800, 20, this.hp, 20);
	}
	
	kill(){
		this.exp+=10;
		document.getElementById("exp").innerHTML=this.exp;
	}
	
	addGold(){
		this.gp++;
		document.getElementById("gp").innerHTML = this.gp;
	}
}