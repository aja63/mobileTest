const txt = document.getElementById("debug");

export default class ActionHandle{
	constructor(){
		this.spawn;
		this.stand = true; 
		this.walk;
		this.jump = "no";
		this.hit = false;
		this.attack;
		this.dir;
	}
	spawning(y,yF,x){
		if(y==yF){this.spawn = false; this.dir = this.setDir(x)};
	}
	
	setDir(x){
		if(x>500){return "L"}else{return "R"};
	}
	
	jumped(){
		const act = this;
		if(this.stand == true){
			this.jump = "jumping"; this.stand = false;
			setTimeout(function(){act.jump = "falling"},500);
			setTimeout(function(){act.jump = "no"},1000);
			setTimeout(function(){act.stand = true},1200);
		}
	}
	
	damaged(){
		const act = this;
		this.hit = true;
		setTimeout(function(){act.hit = false},1000);
	}
	
}