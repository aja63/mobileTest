const txt = document.getElementById("debug");
const mapActual = document.getElementById('map');
const map = mapActual.getContext('2d');


export default class projectile{
	constructor(x,y,s,dir){
		this.x=x;
		this.y=y;
		this.s=s;
		
		this.dir = dir;
		this.speed = 2;
		this.color = "rgb(220, 20, 60)";
	}
	
	draw(){
		map.fillStyle = this.color;
		map.fillRect(this.x,this.y,this.s,this.s);
	}
	
	erase(){
		map.clearRect(this.x-1,this.y-1,this.s+2,this.s+2);
	}
	
	move(){
		this.erase();
		switch(this.dir){
			case "L" : this.moveLeft(); break;
			case "R" : this.moveRight(); break;
		}
		this.draw();
	}
	moveLeft(){
		this.x-=this.speed;
	}
	moveRight(){
		this.x+=this.speed;
	}
	
	
};