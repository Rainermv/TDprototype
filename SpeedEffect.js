#pragma strict

var time : float;
var power : float;

private var normal_speed : float;
private var spaceship : Spaceship;


function Start () {

	spaceship = GetComponent(Spaceship);
	
	normal_speed = spaceship.speed;
	spaceship.speed *= power;

}

function Update () {


	time -= Time.deltaTime;
	
	if (time <= 0)
	{
		spaceship.speed = normal_speed;
		Destroy(this);
	}

}