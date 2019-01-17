#pragma strict

enum Direction { LEFT, RIGHT, UP, DOWN };

var direction : Direction;

private var vec : Vector3;

function Start () {

	switch (direction)
	{
		case Direction.LEFT: vec = Vector3(1,0,0); break;
		case Direction.RIGHT: vec = Vector3(-1,0,0); break;
		case Direction.UP: vec = Vector3(0,0,1); break;
		case Direction.DOWN: vec = Vector3(0,0,-1); break;
	}

}

function Update () {

}