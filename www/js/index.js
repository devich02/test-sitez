
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

window.onload = 
	function()
	{
		setTimeout(animate, 10);
		document.getElementById("div1").onclick = function(){alert("div");};
	};




