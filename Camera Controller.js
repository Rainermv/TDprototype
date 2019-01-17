private var forca : Vector3;
var speed : float;

function Update () {
	
	forca.x = Input.GetAxis("Horizontal");
	forca.z = Input.GetAxis("Vertical");
	
	forca *= speed;
	
	
	
	transform.position += forca * Time.deltaTime;

}




