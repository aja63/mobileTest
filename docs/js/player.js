const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');


const img = new Image(200,100);
img.src ='playerR.png';
export default class Player{
	constructor(){
		
		this.x=900;
		this.y=700;
		this.w=100;
		this.h=200;
		
		this.hp;
		this.dir;
		this.exp;
		this.gp;
		this.weapon = [this.x+this.w,this.y+this.h/3,100,50];	
	}
	
	draw(){
		map.drawImage(img,this.x, this.y);
		this.drawWeapon();
	}
	drawWeapon(){
		map.fillStyle = 'purple';
		map.fillRect(this.weapon[0],this.weapon[1],this.weapon[2],this.weapon[3]);
		
	}
	
	erase(){
		map.clearRect(this.x,this.y,this.w,this.h);
		this.eraseWeapon();
	}
	eraseWeapon(){
		map.clearRect(this.weapon[0],this.weapon[1]-1,this.weapon[2],this.weapon[3]+2);
	}
	
	moveHandle(press){
		if(press == "left"){this.dir="L"};
		if(press == "right"){this.dir="R"};
		txt.innerHTML = this.dir;
	}
	
	move(){
		this.erase();
		switch(this.dir){
			case "L": this.moveLeft(); break;
			case "R": this.moveRight(); break;
			default: break;
		}
		this.draw();
	}
	moveLeft(){
		if(this.x>0){this.x=this.x-3;img.src = "playerLeft.png"; this.weapon[0] = this.x-this.w; this.weapon[0]=this.weapon[0]-3};
	}
	moveRight(){
		if(this.x<1900){this.x+=3;img.src = "playerR.png"; this.weapon[0] = this.x+this.w; this.weapon[0]+=3};
	}
}