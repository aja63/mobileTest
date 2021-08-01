const txt = document.getElementById("debug");
txt.innerHTML = "working";


class Player{
	constructor(){
		this.id = document.getElementById('player');
		this.x = parseInt(this.id.style.left);
		this.y = parseInt(this.id.style.top);
		this.size = 10;
		this.speed = 3;
	}
	
	move(input){
		switch(input){
			case "left": this.moveLeft(); break;
			case "right": this.moveRight(); break;
		}
	}
	
	moveLeft(){
		this.x-=this.speed;
		this.id.style.left=this.x.toString()+"%";
	}
	moveRight(){
		this.x+=this.speed;
		this.id.style.left=this.x.toString()+"%";
	}
	
	
}

const player = new Player();


document.getElementById("left").addEventListener("touchstart", moveHandle);
document.getElementById("right").addEventListener("touchstart", moveHandle);

function moveHandle(){
	player.move(this.id);
}


class Rock{
	constructor(rockCount){
		this.n = rockCount;
		this.id;
		this.size;
		this.x;
		this.y = 5;
		this.speed = 1;
	}
	
	gen(){
		let rock = document.createElement("div");
		rock.className = "rock";
		let left = Math.floor(Math.random()*90+5);
		rock.style.left = left.toString()+"%";
		rock.style.top = "5%";
		let size = Math.floor(Math.random()*7+3);
		rock.style.width = size.toString()+"%";
		rock.style.height = size.toString()+"%";
		document.body.appendChild(rock);
		this.x = left;
		this.id = document.getElementsByClassName("rock")[this.n];
		this.size = size;
	}
	
	move(){
		let rock = this;
		let moving = setInterval(function(){
			rock.y+=rock.speed
			if(rock.y>100){rock.end()};
			rock.id.style.top=rock.y.toString()+"%";
			if(rock.xcol()==true && rock.ycol()==true){rock.hit()};
		},50);
	}
	xcol(){
		if(player.x>this.x&&player.x<this.x+this.size){return true};
		if(player.x+player.size>this.x&&player.x+player.size<this.x+this.size){return true};
		if(this.x>player.x&&this.x+this.size<player.x+player.size){return true};
	}
	ycol(){
		txt.innerHTML = player.y;
		if(player.y<this.y+this.size&&player.y>this.y){return true};
	}
	
	end(){
		clearInterval(moving);
		this.id.remove();
	}
	
	hit(){
		alert("hit"); location.reload();
	}
	
}

let rockCount = 0;
let rocks = [];

function rockSpawn(){
	rocks.push(new Rock(rockCount));
	rocks[rockCount].gen();
	rocks[rockCount].move();
	rockCount++;
}
let rockSpawning = setInterval(rockSpawn,1000);
