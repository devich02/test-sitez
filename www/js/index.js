
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
		document.getElementsByTagName("body")[0].removeChild(e.wheels);
		document.getElementsByTagName("body")[0].removeChild(e.gun);
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

function update_tree(e)
{
	e.x -= 1;
	e.o.style.left = e.x + "px";
	e.top.style.left = (e.x - 10) + "px";
	
	if (e.x < -30)
	{
		document.getElementsByTagName("body")[0].removeChild(e.o);
		document.getElementsByTagName("body")[0].removeChild(e.top);
		--score;
		return true;
	}
	return false;
}

function Tree()
{
	this.x = window.innerWidth + 30;
	
	var body = document.getElementsByTagName("body")[0];
	this.o = document.createElement("div");
	this.o.className = "tree";
	this.o.style.left = this.x + "px";
	
	this.top = document.createElement("div");
	this.top.className = "tree-top";
	this.top.style.left = (this.x - 10) + "px";
	
	body.appendChild(this.o);
	body.appendChild(this.top);
}

var bombs = [];

function create_bomb()
{
	bombs[bombs.length] = new Bomb();
}

function Bomb()
{
	this.y = 45;
	
	var body = document.getElementsByTagName("body")[0];
	this.o = document.createElement("div");
	this.o.className = "bomb";
	this.o.style.top = this.y + "px";
	
	body.appendChild(this.o);
}

function update_bomb(e)
{
	e.y += 5;
	e.o.style.top= e.y + "px";
	if (e.y > window.innerHeight - 40)
	{
		document.getElementsByTagName("body")[0].removeChild(e.o);
		return true;
	}
}

var enemies = [];
var trees = [];

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
	
	for (var i = 0; i < trees.length; ++i)
	{
		if (update_tree(trees[i]))
		{
			trees.splice(i, 1);
			--i;
		}
	}
	
	for(var i = 0; i< bombs.length; ++i)
	{
		if(update_bomb(bombs[i]))
		{
			bombs.splice(i,1);
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

function create_trees()
{
	trees[trees.length] = new Tree();
	setTimeout(create_trees, Math.random() * 3000 + 2500);
}

window.onkeypress =
function(e)
{
	if(e.which == 32 || e.keycode == 32)
	{
		create_bomb();
	}
}

window.onload = 
	function()
	{
		create_enemies();
		create_trees();
		update();
	};

	
	
	
	
	
	