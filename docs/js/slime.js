const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');


const img = new Image(100,100);
img.src = 'slime.png';
export default class Slime{
	constructor(){
		this.x;
		this.y = 750;
		this.w = 100;
		this.h = 100;
		
		this.dir;
		this.alive = true;
	}
	
	draw(){
		map.drawImage(img,this.x,this.y);
	}
	
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
	}
	
	
	
	collide(){
		let colorData = this.getHitbox();
		this.handleCol(colorData);
	}
	
	getHitbox(){
		let hitbox = map.getImageData(this.x+10,this.y,this.w*.8,this.h);
		return hitbox.data;
	}
	handleCol(colorData){
		let obj = ["test"];
		for(let i = 3; i < colorData.length; i+=4){
			if(colorData[i] != 0){
				if(colorData[i-3] == "128" && colorData[i-2] == "0" && colorData[i-3] == "128"){this.kill(); break};
			}
		}
		return obj;
	}	
	
	spawn(){
		this.x = Math.floor(Math.random()*1800+100);
		this.draw();
		if(this.x>1000){this.dir = 'left'}else{this.dir = 'right'};
	}
	
	move(){
		if(this.alive == true){
			this.collide();
			this.erase();
			switch(this.dir){
				case 'left': this.moveLeft(); break;
				case 'right': this.moveRight(); break;
			}
			this.draw();
		}
	}
	moveLeft(){
		if(this.x>0){this.x-=1}else{this.dir = 'right'};
	}
	moveRight(){
		if(this.x<1900){this.x+=1}else{this.dir = 'left'};
	}
	
	kill(){
		this.alive = false;
		let slime = this;
		setTimeout(function(){slime.erase()},50);
	}
}