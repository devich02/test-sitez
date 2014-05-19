var count_right = 0;
var count_total = 0;
var time_now=0;
var last_time=0;
var avg_time=0;
var total_difference = 0;

window.onload =
	function(){
		generate_problem();
	};
	
var a;
var b;	
var user_solution;
	
function generate_problem()
{
	a = Math.floor(Math.random()* 10 +1); 
	b = Math.floor(Math.random()* 10 +1);

	document.getElementById('problem').innerHTML= a + "+" + b ;
	count_total++;
}

window.onkeypress = function(e)
	{
		if(e.which == 13 || e.keycode == 13)
		{
			user_solution = document.getElementById('solution').value;
			
			if(user_solution == a+b)
			{
				count_right++;
				document.getElementById("score").innerHTML = "Score: " + count_right +" of " + count_total;
				document.getElementById("solution").value = "";
				response.style.color = "green";
				document.getElementById("response").innerHTML = "NICE";
				last_time = time_now;
				time_now = (new Date()).getMilliseconds();
				calculate_brainage(true);
				generate_problem();
			}
			else
			{
				document.getElementById("solution").value = "";
				document.getElementById("score").innerHTML = "Score: " + count_right +" of " + count_total;
				response.style.color = "red";
				document.getElementById("response").innerHTML = "WRONG";
				//last_time = time_now;
				//time_now = (new Date()).getMilliseconds();
				calculate_brainage(false);
				generate_problem();
			}
	
		}
	};

function calculate_brainage(correct)
{	
	if(correct == false)
		time_now + 6000;
	
	var difference = time_now - last_time;
	total_difference += difference;
	avg_time = total_difference/count_right;
	
	var brainage = 20
	
	if (avg_time >=80)
		brainage = Math.floor(brainage + (avg_time*.01));
		
	if(count_total >10)
		document.getElementById("brainage").innerHTML = "Brainage: "+(brainage)+"!";
	return;
}













