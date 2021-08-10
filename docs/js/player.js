const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');



export default class Player{
	constructor(){
		this.img = new Image(200,100);
		this.img.src = "playerR.png";
		
		this.x=900;
		this.y=700;
		this.w=100;
		this.h=200;
		
		this.hp;
		this.dir;
		this.jumping = false;
		this.exp;
		this.gp;
		this.weapon = new Weapon();
	}
	
	draw(){
		map.drawImage(this.img,this.x, this.y);
		this.weapon.draw();
	}
	
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
	}

	
	moveHandle(press){
		if(press == "left"){this.dir="L"; this.weapon.flip()};
		if(press == "right"){this.dir="R"; this.weapon.flip()};
		if(press == "jump"){this.jumpStart()};
	}
	
	move(){
		this.erase();
		switch(this.dir){
			case "L": this.moveLeft(); break;
			case "R": this.moveRight(); break;
			default: break;
		}
		this.jump();
		this.draw();
	}
	moveLeft(){
		if(this.x>0){this.x=this.x-5; this.weapon.moveLeft(); this.img.src = "playerLeft.png"};
	}
	moveRight(){
		if(this.x<1900){this.x+=5;this.weapon.moveRight(); this.img.src = "playerR.png"};
	}
	
	jump(){
		if(this.jumping == true){this.y-=8; this.weapon.jump()};
		if(this.y<300){this.jumping = false};
		if(this.jumping == false && this.y != 700){this.y+=8; this.weapon.fall()};
	}
	jumpStart(){
		this.jumping = true;
	}
	
}



class Weapon{
	constructor(){
		this.color = (255,0,255);
		this.x = 1000;
		this.y = 750;
		this.w = 100;
		this.h = 50;
		this.dir = "R";
	}
	
	draw(){
		map.fillStyle = "#ff00ff";
		map.fillRect(this.x,this.y,this.w,this.h);
	}
	erase(){
		map.clearRect(this.x-1,this.y-1,this.w+2,this.h+2);
	}
	
	moveLeft(){
		this.erase();
		this.x-=5;
	}
	moveRight(){
		this.erase();
		this.x+=5;
	}
	flip(){
		switch(this.dir){
			case "R": this.dir = "L"; this.erase(); this.x=this.x-200; break;
			case "L": this.dir = "R"; this.erase(); this.x=this.x+200; break;
		}
	}
	jump(){
		this.y-=8;
	}
	fall(){
		this.y+=8;
	}
}
