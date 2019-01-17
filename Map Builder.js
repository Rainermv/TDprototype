#pragma strict

var building : GameObject;
var right_arrow : GameObject;
var left_arrow : GameObject;
var up_arrow : GameObject;
var down_arrow : GameObject;
var start : GameObject;
var end : GameObject;


public var positions = [
[0,6,0,0,0,0,0,0,0,0],
[1,3,1,1,0,0,0,0,0,0],
[1,0,1,1,1,1,1,1,1,1],
[1,2,0,0,0,0,0,0,3,1],
[1,1,1,1,1,1,1,1,0,1],
[1,1,1,3,0,0,0,0,4,1],
[0,1,3,4,1,1,1,1,1,1],
[1,1,0,1,1,1,1,1,1,1],
[1,1,2,0,0,0,0,0,3,1],
[0,1,1,1,1,1,1,1,0,1],
[0,0,1,0,0,1,0,1,3,1],
[0,0,0,0,0,0,0,0,7,0]
];

//0 = void 
//1 = wall
//2 = right arrow
//3 = down arrow
//4 = left arrow
//5 = up arrow
//6 = start
//7 = end

function Awake () {

var startZ = 275;
var startX = 225; 

for (var j = 0; j < 12; j+= 1)	{
	for (var i = 0; i < 10; i+= 1)	{ 
		
		if (positions[j][i] == 1)
			Instantiate(building,Vector3((i*50) - startX,35, startZ - (j*50)),Quaternion.identity);
			
		else if (positions[j][i] == 2)
		{
			var rarrow = Instantiate(right_arrow,Vector3((i*50) - startX,25,  startZ - (j*50)),Quaternion.identity);
			rarrow.transform.Rotate(90, 0, 0);
		}
		
		else if (positions[j][i] == 3)
		{
			var darrow = Instantiate(down_arrow,Vector3((i*50) - startX,25,  startZ - (j*50)),Quaternion.identity);
			darrow.transform.Rotate(90, 90, 0);
		}
		else if (positions[j][i] == 4)
		{
			var larrow = Instantiate(left_arrow,Vector3((i*50) - startX,25,  startZ - (j*50)),Quaternion.identity);
			larrow.transform.Rotate(90, 180, 0);
		}
		else if (positions[j][i] == 5)
		{
			var arrow = Instantiate(up_arrow,Vector3((i*50) - startX,25,  startZ - (j*50)),Quaternion.identity);
			larrow.transform.Rotate(90, 270, 0);
		}
		else if (positions[j][i] == 6)
		{
			Instantiate(start,Vector3((i*50) - startX,25,  startZ - (j*50)),Quaternion.identity);
			
		}
		else if (positions[j][i] == 7)
		{
			Instantiate(end,Vector3((i*50) - startX,25,  startZ - (j*50)),Quaternion.identity);
			
		}
	}
	
}
	

}

function Update () {

}