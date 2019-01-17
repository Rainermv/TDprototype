

private var damage : int;
private var target : GameObject;
private var seeker : boolean;
//var area : boolean;
var trespasser : boolean;
var slow_effect : boolean;
var slow_time : float;
var slow_power : float;

private var faction : Factions;

private var timer : float;

function Awake()
{	
	SetFaction(Factions.NEUTRAL);	
}

function Start()
{	
	timer = 1;
}

function Update () {
	timer -= Time.deltaTime;
	
	if (timer <= 0)
	{
//		if (target)
//		{
//			Hit(target.gameObject, target.GetComponent(Spaceship));
//		}

	Destroy (gameObject);
						
	}
	
	//if ((seeker) && (target))
	//	transform.LookAt(target.transform.position);
}

function Hit (enemyGO : GameObject, enemySS : Spaceship)
{	

		if ((slow_effect) && (enemyGO.GetComponent("SpeedEffect") == null))
			{
				Debug.Log("SLOW HIT");
				var speedeffect = enemyGO.AddComponent(SpeedEffect);
				speedeffect.time = slow_time;
				speedeffect.power = slow_power;
				
			}
			
			enemySS.DealDamage(damage);
			
			Debug.Log("HIT");
			
			
			if (!trespasser)
				Destroy (gameObject);
				
			
	
}

function OnTriggerEnter (collider : Collider)
{
	if (collider.tag == "Enemy")
	{
	
		var enemy = collider.GetComponent(Spaceship);
		//Debug.Log(faction);
		if (enemy)
		{
			Hit(collider.gameObject, enemy);
		
		}
	}
	else if ((collider.tag == "Plane") &&(target))
		{
		
			if (trespasser)
				Destroy (gameObject);
			else
				Hit(target.gameObject, target.GetComponent(Spaceship));
		}
}



function SetProjectile (tar : GameObject, fac : Factions, dam: int, seek : boolean, _area : boolean)
{
	SetTarget(tar);
	SetFaction(fac);
	SetDamage(dam);
	
	seeker = seek;
	//area = _area;
	
	//transform.LookAt(target.transform.position);
	
	switch (faction)
		{
			case Factions.PLAYER:
				renderer.material.color = Color(0,0,1);
				break;
			case Factions.ENEMY:
				renderer.material.color = Color(1.0,0,0);
				break;
		}
	
	
}

function SetTarget (tar : GameObject)
{
	target = tar;
}

function SetFaction (fac : Factions)
{
	faction = fac;
}

function SetDamage (dam : int)
{

	damage = dam;
	//Debug.Log(damage);
}

