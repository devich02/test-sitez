
function animate()
{
	var div = document.getElementById("div1");
	
	var r = div.getAttribute("r");
	if (r == "" || typeof(r) == "undefined" || r == null)
	{
		div.setAttribute("r", "1");
		div.setAttribute("radius", "200");
		r = 1;
	}
	else
		r = +r;
		
	var radius = div.getAttribute("radius");
	radius = +radius;
	
	if (r == 1)
	{
		radius-=2;
		div.style.borderRadius = radius + "px";
		if (radius == 0)
		{
			div.setAttribute("r", 0);
		}
		div.setAttribute("radius", radius);
	}
	else
	{
		radius+=2;
		div.style.borderRadius = radius + "px";
		if (radius == 200)
		{
			div.setAttribute("r", 1);
		}
		div.setAttribute("radius", radius);
	}
	
	setTimeout(animate, 10);
}

function update_enemy(e)
{
	--e.x;
	e.o.style.left = e.x + "px";
}

function Enemy()
{
	this.x = window.innerWidth - 30;
	
	var body = document.getElementsByTagName("body")[0];
	this.o = document.createElement("div");
	this.o.className = "enemy";
	this.o.style.left = this.x + "px";
	
	body.appendChild(this.o);
}

var enemies = [];

function update()
{
	for (var i = 0; i < enemies.length; ++i)
	{
		update_enemy(enemies[i]);
	}
	
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

