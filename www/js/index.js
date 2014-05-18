
var score = 0;

function update_enemy(e)
{
	e.x -= 2;
	e.o.style.left = e.x + "px";
	e.wheels.style.left = (e.x - 10) + "px";
	e.gun.style.left = (e.x - 7) + "px";
	
	if (e.x < -30)
	{
		document.getElementsByTagName("body")[0].removeChild(e.o);
		--score;
		return true;
	}
	return false;
}

function Enemy()
{
	this.x = window.innerWidth - 30;
	
	var body = document.getElementsByTagName("body")[0];
	this.o = document.createElement("div");
	this.o.className = "enemy";
	this.o.style.left = this.x + "px";
	
	this.wheels = document.createElement("div");
	this.wheels.className = "enemy-wheels";
	this.wheels.style.left = (this.x - 10) + "px";
	
	this.gun = document.createElement("div");
	this.gun.className = "enemy-gun";
	this.gun.style.left = (this.x - 7) + "px";
	
	body.appendChild(this.o);
	body.appendChild(this.wheels);
	body.appendChild(this.gun);
}

var enemies = [];

function update()
{
	for (var i = 0; i < enemies.length; ++i)
	{
		if (update_enemy(enemies[i]))
		{
			enemies.splice(i, 1);
			--i;
		}
	}
	
	document.getElementById("score").innerHTML = "Score " + score;
	
	setTimeout(update, 50);
}

function create_enemies()
{
	enemies[enemies.length] = new Enemy();
	setTimeout(create_enemies, Math.random() * 2000 + 1500);
}

window.onload = 
	function()
	{
		create_enemies();
		update();
	};

window.onkeypress = 
	function(e)
	{
		if (e.which == 97)
			alert('asdf');
	};