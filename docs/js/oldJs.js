const txt = document.getElementById("debug");
txt.innerHTML = "working";

class Player{
	constructor(){
		this.id = document.getElementById("player");
		this.left = 45;
		this.top = 80;
		this.width = 10;
	}
	
	move(div){
		switch(div){
			case "left": this.moveLeft(); break;
			case "right": this.moveRight(); break;
		}
	}
	moveLeft(){
		let currentLeft = parseInt(this.id.style.left);
		if(currentLeft>0){currentLeft -= 10; this.left-=10};
		let newLeft = currentLeft.toString()+"%";
		this.id.style.left = newLeft;
	}
	
	moveRight(){
		let currentLeft = parseInt(this.id.style.left);
		if(currentLeft<90){currentLeft += 10; this.right+=10};
		let newLeft = currentLeft.toString()+"%";
		this.id.style.left = newLeft;
	}
	
}


class Rock{
	constructor(){
		this.w = 0;
		this.h = 0;
		this.top = 0;
		this.left = 0;
		this.count = 0;
		this.get = document.getElementsByClassName("rock");
	}
	
	generate(rockCount){
		this.count = rockCount;
		let rock = document.createElement("div");
		rock.className = "rock";
		this.w = Math.floor(Math.random()*20+10).toString()+"%";
		rock.style.width = this.w;
		this.h = Math.floor(Math.random()*20+10).toString()+"%";
		rock.style.height = this.h;
		rock.style.top = "1%";
		this.top = 1;
		this.left =  Math.floor(Math.random()*90+5).toString()+"%";
		rock.style.left = this.left;
		document.body.append(rock)
	}
	
/* 	 checkCol(){
		let col = [];
		
		if(player.left>=this.left&&player.left<=this.left+this.w){col.push(true)}
		else if(player.left+player.width>=this.left&&player.left+player.width<=this.left+this.w){col.push(true)};
		
		if(player.top>=this.top&&player.top<=this.top+this.w){col.push(true)}
		else if(player.top+player.width>=this.top&&player.top+player.width<=this.top+this.w){col.push(true)};
		
		txt.innerHTML = col;
		if(col[0] == true && col[1] == true){alert("gottem")};
	} */
	 
	checkCol(){
		if(player.left>parseInt(this.left) && player.left<parseInt(this.left)+parseInt(this.w)){alert('yes')}
		txt.innerHTML = this.left.toString()+player.left.toString();
	}

	
	move(){
		let rock = this;
		setInterval(function(){
			let activeRock = document.getElementsByClassName("rock")[rock.count];
			if(rock.top<100){rock.top+=5};
			rock.checkCol();
			activeRock.style.top = rock.top.toString()+"%";
		},300)
	}
}

const player = new Player();
let rocks = [];
let rockCount = 0;


document.getElementById("left").addEventListener("click", moveHandle);
document.getElementById("right").addEventListener("click", moveHandle);


function moveHandle(){
	player.move(this.id);
}

function genRock(){
	rocks.push(new Rock());
	rocks[rockCount].generate(rockCount);
	rocks[rockCount].move();
	rockCount++;
}

setInterval(genRock, 2000);


