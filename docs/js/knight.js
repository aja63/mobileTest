const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');

import ActionHandle from './actionHandle.js';
import Projectile from './projectile.js';

export default class Knight{
	constructor(){
		this.x = 450;
		this.y = 300;
		this.w = 50;
		this.h = 100;
		
		this.img = new Image(50,100);
		this.img.src = "player.png";
		
		this.act = new ActionHandle();
		this.act.dir = "R";
		this.weapon = new Weapon(this.x);
		
		this.stats = new Stats();
	}
	
	
	
	//basic Function
	draw(){
		this.collision();
		map.drawImage(this.img, this.x, this.y);
		this.weapon.draw();
	}
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
		this.weapon.erase();
	}
	checkDeath(){
		if(parseInt(document.getElementById("hp").style.width) == 0){alert('dead')};
	}
	
	
	
	
	//handles player inputs from main.js
	moveHandle(input){
		this.weapon.input(input);
		switch(input){
			case "left": this.act.dir = "L"; break;
			case "right": this.act.dir = "R"; break;
			case "jump": this.act.jumped(); break;
	
		}
	}
	
	
	
	
	
	//called by main.js for animation
	move(){
		this.weapon.attack();
		this.collision();
		this.erase();
		switch(this.act.dir){
			case "L": this.moveLeft(); break;
			case "R": this.moveRight(); break;
		}
		if(this.act.jump == "jumping"){this.moveUp()};
		if(this.act.jump == "falling"){this.moveDown()};
		this.draw();
	}
	moveLeft(){
		if(this.x>1){this.x=this.x-this.stats.speed; this.weapon.moveLeft()};
	}
	moveRight(){
		if(this.x<950){this.x+=this.stats.speed; this.weapon.moveRight()};
	}
	moveUp(){
		this.y-=this.stats.speed; this.weapon.moveUp();
	}
	moveDown(){
		this.y+=this.stats.speed; this.weapon.moveDown();
	}
	
	
	//collision
	collision(){
		let hitbox = map.getImageData(this.x-1,this.y,this.w+2,this.h).data;
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
		if(r == 255 && g == 150 && b == 171){this.damage()};
		if(r == 171 && g == 142 && b == 5){this.stats.gainGold()};
		if(r == 94 && g == 87 && b == 94){this.stats.damage()};
		
	}
	
	damage(){
		if(this.act.hit == false){this.stats.damage(); this.act.damaged();};
	}
	
	
	
}


//WEAPON CLASS
class Weapon{
	constructor(){
		this.x = 500;
		this.y = 325;
		this.w = 100;
		this.h = 50;
		this.dir = "R";
		this.speed = 3;
	}
	
	draw(){	
		map.fillStyle = "rgb(220,20,210)";
		map.fillRect(this.x,this.y,this.w,this.h);
	}
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
	}
	
	moveLeft(){
		this.x=this.x-this.speed;
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
	
	input(input){
		switch(input){
			case "left": if(this.dir == "R"){this.erase(); this.x-=(this.w+50); this.dir = "L"}else{this.attack("R")}; break;
			case "right": if(this.dir == "L"){this.erase(); this.x+=(this.w+50); this.dir = "R"}else{this.attack("L")}; break;
		}
	}
	
	attack(dir){
		
	}
	

}



//STATS CLASS
class Stats{
	constructor(){
		this.speed = 3;
		this.hp = 500;
		this.exp = 0;
		this.gp = 10;
		
		this.hpbuys = 1;
		this.speedbuys = 1;
		this.weaponbuys = 1;
	}
	
	
	//health and damage
	damage(){
		this.hp-=50;
		this.drawHp();
	}
	
	heal(){
		this.hp+=50;
		this.drawHp();
	}
	
	drawHp(){
		document.getElementById("hp").style.width = this.hp.toString()+"px";
	}
	
	//exp and gold
	gainExp(amt){
		this.exp+=amt;
		document.getElementById("exp").innerHTML = this.exp;
	}
	
	gainGold(){
		this.gp++;
		document.getElementById("gp").innerHTML = this.gp;
	}
}