var deselect : boolean = true;

function OnTriggerEnter (collider : Collider) {


	if (collider.tag == "Spaceship")
	{
		var pc : PlayerControl  = collider.GetComponent("PlayerControl");
		Debug.Log("selected " + collider.name);
		
		if (pc)
		{
			Debug.Log("selected " + collider.name);
			pc.Select();
		}
	}
	
	 //Destroy(collider.gameObject);
	
}

function OnTriggerExit (collider : Collider)
{
	if (collider.tag == "Spaceship")
	{
		var pc : PlayerControl  = collider.GetComponent("PlayerControl");
		
		if ((pc) && (deselect))
		{
			pc.Deselect();
		}
	}
	
}

function update()
{
	if (!deselect)
		Destroy(gameObject);
}

