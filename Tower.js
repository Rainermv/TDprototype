
var destroyEffect : GameObject;

//////////////// TESTING //////////////


//private var boolShield : boolean;
//private var intTime : int;

////////////////// PUBLIC PARAMETERS ////////////////

var starting_cost : int;
var cost : int = starting_cost;
var cost_adjust : int;

var faction : Factions;

var damage : float;

var cooldown: float;
var ccd: float;

var seekerShots : boolean;
var areaShots : boolean;

var aquireTarget_range : float;

var weapons : GameObject[];

var projectile : GameObject;


var sound_array : AudioClip[];

var minimap_mark : Renderer;

var enabled_color : Color = Color (0.5  ,0.5,1,0.5);
var disabled_color : Color = Color(0.5,0  ,0  ,0.5);
var active_color : Color = Color(0,0,1,1);

var base_torre : GameObject;
var base_ext_y : float;
var ponto_lig : Vector3;

//////////////// PRIVATE PARAMETERS ////////////////

enum TOWstate{ ACTIVE, BUILD_EN, BUILD_DIS};

private var state : TOWstate;

private var weapon_array;

private var target : GameObject;
private var Timer = 0.0;

private var range_marker : Renderer;

private var audioSource : AudioSource;




//////////////////////////////// START ////////////////////////////////////

private var MANAGER : GameManager;

function Awake()
{
	MANAGER = GameObject.FindWithTag("Manager").GetComponent("GameManager");
}



function Start()
{
//	ConfigureAudioSource();
	ClampValues();
	
	ConfigureMiniMapMarker();
	
	//ConfigurePlayerColor();
	
	ConfigureWeapons();
	
	ConfigureHead();
	
	state = TOWstate.ACTIVE;
	
	if (base_torre)
	{
		base_torre = Instantiate(base_torre, transform.position,Quaternion.identity);
		base_ext_y = base_torre.collider.bounds.extents.y;
		ponto_lig = Vector3(0, base_ext_y, 0);
		transform.position += ponto_lig;
	}
	
	
		
	
	
		
}

function Reposition(pos : Vector3)
{
	base_torre.transform.position = Vector3(pos.x, pos.y + base_ext_y, pos.z);
	transform.position =  base_torre.transform.position + ponto_lig;
}

function ClampValues()
{
	Mathf.Clamp(cost, 0, 9999);
	Mathf.Clamp(damage, 1, 999);
	Mathf.Clamp(cooldown, 0.1,99);
	Mathf.Clamp(aquireTarget_range, 50,9999);
	
	
	
	//cost_adjust = cost * 0.05;
}

function AdjustCost()
{
	//cost += cost_adjust;
}

function ResetCost()
{
	cost = starting_cost;
}

function ConfigureHead()
{
	//range_marker = transform.Find("Range").GetComponent(Renderer);
	
}

function ConfigureWeapons()
{
	target = null;
	ResetTimer();
	
	weapon_array = new Array (weapons);
}

function ConfigureMiniMapMarker()
{
	 minimap_mark = transform.Find("Minimap_marker").GetComponent(Renderer);
	 if (minimap_mark != null)
	 	minimap_mark.enabled = true;
}

//function ConfigurePlayerColor()
//{
//	switch (faction)
//		{
//			case Factions.PLAYER:
//				active_color = Color(0,0,1);
//					break;
//			case Factions.ENEMY:
//				active_color = Color(1,0,0);
//					break;
//		}
//	
//	SetColor(active_color);
//	
//}

function SetColor(color : Color)
{
	renderer.material.color = color;
	
	//var childRenderer : Component[];
	var childRenderer = GetComponentsInChildren (Renderer);
	for (var child : Renderer in childRenderer) {
    	child.material.color = color;
	}
	
}

//////////////////////////////// UPDATE ////////////////////////////////////
var stateSwitch : boolean = true;

function SwitchState(new_state : String)
{
	switch (new_state)
	{
		case "active":
				state = TOWstate.ACTIVE;
				stateSwitch = true;
				break;
		case "enable":
				state = TOWstate.BUILD_EN;
				stateSwitch = true;
				break;
		case "disable":
				state = TOWstate.BUILD_DIS;
				stateSwitch = true;
				break;
	}
	
	
	
}

function GetState() : TOWstate
{
	return state;
	
}

function Update()
{
	
	
	
	switch (state)
	{
		case TOWstate.ACTIVE: 
					ActiveState();
					break;
		case TOWstate.BUILD_EN:
					Build_EnabledState();
					break;
		case TOWstate.BUILD_DIS:
					Build_DisabledState();
					break;
					
	}
	
}

function Build_EnabledState()
{
	if (stateSwitch)
	{
		SetColor(enabled_color);
		stateSwitch = false;
	
	}
	
	
	
}

function Build_DisabledState()
{
	if (stateSwitch)
	{
		SetColor(disabled_color);
		stateSwitch = false;
	
	}
}

function ActiveState()
{
	if (stateSwitch)
	{
		SetColor(active_color);
		stateSwitch = false;
	
	}
	AquireTarget();
}

function AquireTarget()
{
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

function ResetCooldown()
{
	ccd = cooldown;
}

function ResetTimer()
{
	Timer = 0.0;
}

function ScanForTargets()
{
	//var targets_in_range : Collider[];
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
//    				Debug.Log(col.name + Distance(col.gameObject));
    			}
    		
    	}
    	
    	if (targetFound)
    		LockTarget(closestTarget);
    	
    	
    }	
    

}


function ReleaseTarget()
{
	target = null;
}


function LockTarget( newTarget : GameObject)
{
	target = newTarget;
//	Debug.Log("Target Locked : " + target.name);
	
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
	transform.LookAt(target.transform.position);
	
	ccd -= Time.deltaTime;
	if (ccd <= 0)
	{
		Debug.DrawLine(transform.position, target.transform.position, Color(1,0,0,1), 0.1);
		
		for (var weapon in weapon_array)	
		{	 
			var shot = Instantiate(projectile, weapon.transform.position, transform.rotation);
			shot.GetComponent(Projectile).SetProjectile(target, faction, damage, seekerShots, areaShots);
			
		}	
						
			//if (seekerShots)
				//obj.GetComponent(Projectile).SetSeeker(target);
			
			//spaceship.PlaySound(SoundIndex.FIRE);
			
		ResetCooldown();
			
	}
				
		
	
}

/////////////////////////////////////////////////////////////////



// retorna a distancia entre 2 objectos
function Distance(target : GameObject) : float
{
	return Vector3.Distance(target.transform.position, transform.position);
	
}

function FixedUpdate () 
{	
	

}


function OnGUI() {
	

}


function OnCollisionEnter(collision : Collision) {
	
	Debug.Log("collide");
	rigidbody.Sleep();
	
	collide = true;

}

function OnCollisionExit(collision : Collision) {
	
	Debug.Log("collide");
	
	
	collide = false;

}
/////////////////////////////////////////////////////////



function GetActiveColor() : Color
{
	return active_color;
}



function Die()
{

	Destroy(gameObject);
	
}


///////////////////////////// FACTION CONTROLLERS ///////////////

function SetFaction (fac : Factions)
{
	faction = fac;
}

/////////////////////////////// SOUNDS //////////////////////////




//function ConfigureAudioSource()
//{
//	audioSource = GetComponent(AudioSource);
//}
//
//function PlaySound(_sound : SoundIndex)
//{
//	if (sound_array[_sound])
//		audioSource.PlayOneShot(sound_array[_sound]);
//	
//}


