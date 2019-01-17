#pragma strict

var buildable : boolean = true;
var pos : Vector3;

function Start () {

	pos = transform.position;
	pos.y += collider.bounds.extents.y;

}

function Update () {

}