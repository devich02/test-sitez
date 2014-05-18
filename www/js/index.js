
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
		for( var i = 100; i >0; i--)
		{
			setTimeout(create_particle, i * 10);
		}
		return true;
	}
}

var explosion =[];

function Explosion()
{
	this.y = window.innerHeight - 40;
	
	this.counter = 0;
	var body = document.getElementsByTagName("body")[0];
	this.o = document.createElement("div");
	this.o.className = "explosion";
	this.o.style.top = this.y + "px";
	
	var r = Math.random();
	
	if (r < .33)
		this.o.style.backgroundColor = "red";
	else if(r < .66)
		this.o.style.backgroundColor = "orange";
	else
		this.o.style.backgroundColor = "yellow";
		
	body.appendChild(this.o);
	
}

function update_explosion(e)
{
	e.counter++;
	if (e.counter <7)
	{
		e.y-= 2;
	}
	else
	{
		e.y+= 2;
	}
	
	if(e.counter > 10)
	{
		document.getElementsByTagName("body")[0].removeChild(e.o);
		return true;
	}
	e.o.style.top = e.y +"px";
	e.o.style.left = (35 + (Math.random() - .5)*3) + "%";
}

function create_particle()
{
	explosion[explosion.length] = new Explosion();
}

var enemies = [];
var trees = [];
var particles = [];

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
	
	for (var i = 0; i < particles.length; ++i)
	{
		if (update_particle(particles[i]))
		{
			particles.splice(i, 1);
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

	for(var i = 0; i < explosion.length; ++i)
	{
		if(update_explosion(explosion[i]))
		{
			explosion.splice(i,1);
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
	setTimeout(create_trees, Math.random() * 5000 + 5500);
}

function update_particle(e)
{
	if (e.ttl++ == 100)
	{
		document.getElementsByTagName("body")[0].removeChild(e.o);
		return true;
	}
	
	e.x += e.vx;
	e.y += e.vy;
	
	e.vy += e.ay;
	
	e.o.style.left = e.x + "px";
	e.o.style.top = e.y + "px";
	
	return false;
}


function Particle(x, y)
{
	this.x = x + Math.random() * 50;
	this.y = y + Math.random() * 50;
	this.vx = Math.random() * 10 - 5;
	this.vy = -2 + Math.random() * 10 - 5;
	this.ay = .4;
	this.ttl = 0;
	
	this.o = document.createElement("div");
	this.o.style.left = this.x + "px";
	this.o.style.top = this.y + "px";
	this.o.style.position = "absolute";
	this.o.style.width = "5px";
	this.o.style.height = "5px";
	this.o.style.borderRadius="2px";
	
	this.o.style.backgroundColor = "rgb("+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+")";
	
	document.getElementsByTagName("body")[0].appendChild(this.o);
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
	
window.onmousedown = 
	function(e)
	{
		for(var i = 0; i < 100; ++i)
			particles[particles.length] = new Particle(e.x, e.y);
			
	};

	
	
	
	
	
	
