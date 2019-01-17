var nextTime : float;
var damage : float;

var cooldown: float;
var ccd: float;

var seekerShots : boolean;

var aquireTarget_range : float;

var weapons : GameObject[];
private var weapon_array;

var projectile : GameObject;

private var target : GameObject;
private var Timer;

private var spaceship : Spaceship;

function Awake()
{
	spaceship = GetComponent(Spaceship);
}


function Start()
{
	target = null;
	ResetTimer();
	
	weapon_array = new Array (weapons);
//	Debug.Log(weapon_array.length);
	
		
	
}



function Update () {
	
	switch (spaceship.GetState())
	{
	
		case (SSstate.ACTIVE):
		
			if (Timer <= 0.0)
			{
				ScanForTargets();
				ResetTimer();
			}
			
			Timer -= Time.deltaTime;
			
			
			
			if (TargetIsLocked())
				if (Distance(target) <= aquireTarget_range)
					ShootTarget();
				else
					ReleaseTarget();
			
	}
	
}

///////////////////////////////////////////////////////////

function ResetCooldown()
{
	ccd = cooldown;
}

function ResetTimer()
{
	Timer = 0.1;
}

function ScanForTargets()
{
	//var targets_in_range : Collider[];
	var faction = spaceship.faction;
//	Debug.Log("fighter faction" + faction);
	
	var targets_in_range = Physics.OverlapSphere (transform.position, aquireTarget_range);
	
	var closestTarget;
	var max_distance : float = aquireTarget_range;
	
	if (!TargetIsLocked())
	{
	  var targetFound : boolean = false;
	  for (var col : Collider in targets_in_range)
    	//if (col.tag == "Enemy")
     	//if ((col.tag)  && (tag != col.tag))
     	if (col.gameObject.GetComponent(Spaceship))
     	if (col.gameObject.GetComponent(Spaceship).faction != faction)
  		{
    		
    		
    		if ((Distance(col.gameObject) <= max_distance))
    			{
    				closestTarget = col.gameObject;
    				targetFound = true;
    				Debug.Log(col.name + Distance(col.gameObject));
    			}
    		
    	}
    	
    	if (targetFound)
    		LockTarget(closestTarget);
    	
    	
    }	
    

}

function Distance(obj : GameObject) : float
{
	return Vector3.Distance(transform.position, obj.transform.position);
	
}

function ReleaseTarget()
{
	target = null;
}


function LockTarget( newTarget : GameObject)
{
	target = newTarget;
	Debug.Log("Target Locked : " + target.name);
	
}

function TargetIsLocked() : boolean
{
	if (target != null)
		return true;
	else
		return false;
}

function ShootTarget()
{
	ccd -= Time.deltaTime;
	if (ccd <= 0)
	{
		Debug.DrawLine(transform.position, target.transform.position, Color(1,0,0,1), 0.1);
		
		for (var weapon in weapon_array)		 
		{
			var enemy = Instantiate(projectile, weapon.transform.position, weapon.transform.rotation);
			enemy.GetComponent(Projectile).SetProjectile(target, spaceship.faction, damage, seekerShots, false);
			
			//obj.transform.LookAt(target.transform.position);
			//obj.GetComponent(Projectile).SetDamage(damage);
			
			//if (seekerShots)
				//obj.GetComponent(Projectile).SetSeeker(target);
			
			//spaceship.PlaySound(SoundIndex.FIRE);
			
		}
				
		ResetCooldown();
	}
}

/////////////////////////////////////////////////////////////////

