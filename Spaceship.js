//var completionBar : GameObject;
var destroyEffect : GameObject;
var mesh : GameObject;

enum SSstate { ACTIVE, NULL };


//////////////// TESTING //////////////


private var boolShield : boolean;
private var intTime : int;

var healthBarFactor : float;

////////////////// PUBLIC PARAMETERS ////////////////
var spawn_time : float;

var kill_value : int;

var faction : Factions;

var speed : float;

var damage : int;

var maxShield : int;
var maxHealth : int;

var sound_array : AudioClip[];

var minimap_mark : Renderer;

//////////////// PRIVATE PARAMETERS ////////////////


private var faction_color : Color = Color(0.5,0.5,0.5);

private var shield : int;
var health : int;

private var maxShieldReg : float;
private var currShieldReg : float;

private var shieldRegenQuant : int;

private var state : SSstate = SSstate.NULL;

private var buildingTimeLeft : float;

private var buildFactor : float;

private var destroyed : boolean = false;


private var healthBar :Texture;
private var healthBarSize : Vector2;
private var fullHealthBarSize : Vector2;

private var audioSource : AudioSource;

private var MANAGER : GameManager;

function Awake()
{
	MANAGER = GameObject.FindWithTag("Manager").GetComponent("GameManager");
}



//var _collider: GameObject;

function Start()
{
	//transform.position.y = Ypos;
	//transform.position.y = transform.localScale.y/2;
	
	ClampValues();
		
	ConfigureAudioSource();
	
	ConfigureHealthBar();
	
	ConfigureShieldReg(); 
	
	ConfigureMiniMapMarker();
	
	ConfigurePlayerColor();
	
	
	if (state == SSstate.NULL)
	{
		state = state.ACTIVE;
		
		SetHealth(maxHealth);
		SetShield(maxShield);
	}
	
	
}

function ClampValues()
{
	Mathf.Clamp(maxHealth, 1, 1024);
	Mathf.Clamp(maxShield, 0, 1024);
	
	Mathf.Clamp(speed, 10, 100);
	
	Mathf.Clamp(damage, 1, 1000);
	
	Mathf.Clamp(spawn_time,0.005,3);
	
	rigidbody.drag = 10;
	speed *= 1000;
	
	transform.position.y += collider.bounds.extents.y;
	
}


function ConfigureMiniMapMarker()
{
//	 minimap_mark = transform.Find("Minimap_marker").GetComponent(Renderer);
//	 	
//	 if (minimap_mark != null)
//	 	minimap_mark.enabled = true;
}

function ConfigurePlayerColor()
{
	switch (faction)
		{
			case Factions.PLAYER:
				faction_color = Color(0,0,1);
					break;
			case Factions.ENEMY:
				faction_color = Color(1,0,0);
					break;
		}
		
	renderer.material.color = faction_color;
	var childRenderer : Component[];
	childRenderer = GetComponentsInChildren (Renderer);
	for (var i : Renderer in childRenderer) {
    	i.material.color = faction_color;
	}
	if (minimap_mark)
		minimap_mark.material.color = faction_color;	
}

function ConfigureHealthBar()
{
	healthBar = Resources.Load("HealthBar") as Texture2D;
	
	healthBarSize = Vector2(maxHealth * 0.2, 3);
	fullHealthBarSize = healthBarSize;

}


function AdjustToEasy()
{
	health *= .8;
	kill_value *= 1.2;
}

function AdjustToHard()
{	
	
	maxHealth *= 1.2;
	kill_value *= .8;
}


function Update()
{
	CheckHealth();
	//UpdateHealthBar();
	
	if (maxShield > 0)
			ApplyShieldRegeneration();

}

function CheckHealth()
{
	
	if (GetHealth() <= 0)
		Die();
}


// retorna a distancia entre 2 objectos
function distance(target : Vector3) : float
{
	return Vector3.Distance(target, transform.position);
	
}

function FixedUpdate () 
{	
	
	switch (state) 
	{
		case SSstate.ACTIVE: 
				rigidbody.AddRelativeForce (Vector3.forward * speed * Time.fixedDeltaTime);
	}

}


function ApplyShieldRegeneration()
{
	if (GetShield() < maxShield)
	{
		if (currShieldReg <= 0)
		{
			RegShield(shieldRegenQuant);
			ResetShieldRegen();
				
		}
		else 
			currShieldReg -= Time.deltaTime;
	}
	
	

}


//function UpdateHealthBar()
//{
//	switch (state)
//	{
//		case state.BUILDING:
//			
//			if (completionBar != null){
//		  		buildFactor = 1 - buildingTimeLeft / buildingTime;
//		  		//Debug.Log(buildFactor);
//				completionBar.renderer.material.SetColor("_Color",  Color(1 - buildFactor, buildFactor, 0, 1));
//				
//		  	}
//		  	break;
//		case state.ACTIVE:
//			if (completionBar != null){
//					completionBar.renderer.enabled = false;
//					completionBar = null;
//			}
//			break;
//	}
//	
//	
//	
//	//DrawHealthBar();
//}



//function OnGUI() {
//
//	if (healthBar)
//	{	
//		var fhealth : float = health;
//		var fmaxh : float = maxHealth;
//		
//			
//		
//		var screen_height = camera.GetScreenHeight();
//		var cam = Camera.mainCamera;
//	   	//var screen_pos = cam.WorldToScreenPoint(transform.position);
//	   	var screen_pos = cam.ViewportToScreenPoint (transform.position);
//	   	
//	   	// red rectangle
//		var red_rect = Rect(screen_pos.x - healthBarSize.x/2, 
//						screen_height - screen_pos.y - 10, 
//						healthBarSize.x, 
//						healthBarSize.y);
//		// green rectangle
//		var green_rect = Rect((screen_pos.x - healthBarSize.x/2), 
//						screen_height - screen_pos.y - 10, 
//						healthBarSize.x * fhealth/fmaxh, 
//						healthBarSize.y);
//
//		Debug.Log(screen_pos.x);
//		
//		
//			
//		
//							 
//		GUI.color = new Color(0.0f , 0.0f, 0);
//		GUI.DrawTexture(red_rect, healthBar);
//		
//		GUI.color = new Color(0.0f , 1.0f, 0);
//		GUI.DrawTexture(green_rect, healthBar);
//		
//		if (shield > 0)
//		{
//		var fshield : float = shield;
//		var fmaxs : float = maxShield;
//		// blue rectangle
//		var blue_rect = Rect((screen_pos.x - healthBarSize.x/2), 
//						screen_height - screen_pos.y - 10, 
//						healthBarSize.x * fshield/fmaxs, 
//						healthBarSize.y);
//		
//		GUI.color = new Color(0.0f , 0.0f, 1.0f);
//		GUI.DrawTexture(blue_rect, healthBar);
//		
//		}
//		
//		
//		GUI.color = Color.white;//Reset color to white
//	
//		
//		
//	}
//
//}


function OnCollisionEnter(collision : Collision) {
	
	//Debug.Log("collide");
	rigidbody.Sleep();
	
	collide = true;

}

function OnCollisionExit(collision : Collision) {
	
	//Debug.Log("collide");
	
	
	collide = false;

}



function OnTriggerEnter (collider : Collider)
{
	
	
	if ((collider.tag == "RightArrow") )
	{
		transform.rotation = Quaternion.identity;
		transform.Rotate(0,90,0);
		
//		Debug.Log("collide");
		
		arrow_collide = false;
	}
	
	else if ((collider.tag == "DownArrow") )
	{
		transform.rotation = Quaternion.identity;
		transform.Rotate(0,180,0);
		
//		Debug.Log("collide");
		
		arrow_collide = false;
	}
	
	else if ((collider.tag == "LeftArrow") )
	{
		transform.rotation = Quaternion.identity;
		transform.Rotate(0,270,0);
		
//		Debug.Log("collide");
		
		arrow_collide = false;
	}
	
	else if ((collider.tag == "UpArrow") )
	{
		transform.rotation = Quaternion.identity;
		transform.Rotate(0,0,0);
		
//		Debug.Log("collide");
		
		arrow_collide = false;
	}
	
	else if (collider.tag == "End")
	{
		HitTarget();	
		
	}
	
	
}

function OnTriggerExit (collider : Collider)
{

	
}
///////////  UNUSED ////////////////////////////


/////////////////////////////////////////////////////////

function GetFactionColor() : Color
{
	return faction_color;
}

function GetState() : SSstate
{
	return state;
}

function GetHealth() : int
{
	return health;
}

function SetHealth(val : int)
{	
	health = val;
}

function RegHealth(val : int)
{
	health += val;
	if (health >= maxHealth)
		health = maxHealth;
}

function RegShield(val : int)
{
	shield += val;
	if (shield >= maxShield)
		shield = maxShield;
}

function GetShield() : int
{
	return shield;
}

function SetShield(val : int)
{	
	shield = val;
}

function ConfigureShieldReg()
{
	maxShieldReg = 5;
	currShieldReg = maxShieldReg;
	
	shieldRegenQuant = maxShield/10;
}


function ResetShieldRegen()
{
	currShieldReg = maxShieldReg;
	
}

function DealDamage(dam : int)
{
	if (shield > 0)	
	{
		shield -= dam;
	}
	else
	{
		health -= dam;
	}
	
	MANAGER.Total_damage_on_enemies(dam);
	
	ResetShieldRegen();
}



function Die()
{

	if (destroyEffect)
		{
		var deseffect = Instantiate(destroyEffect, transform.position, transform.rotation);
		Destroy (deseffect, 5);
		//deseffect.SendMessage ("AdjustToEasy");
		var childRenderer : Component[];
		childRenderer = deseffect.GetComponentsInChildren (Renderer);
		for (var i : Renderer in childRenderer) 
		{
    		i.material.color = faction_color;
		}
		
//		var radius = 50.0;
//		var power = 10.0;
//		
//		var explosionPos : Vector3 = transform.position;
//        var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
//    
//   		for (var hit : Collider in colliders) {
//        	if (!hit)
//            	continue;
//        
//        	if (hit.rdeseffectigidbody)
//            	hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 3.0);
//        }
        }
	
	destroyed = true;
	
	MANAGER.SpaceshipDestroyed(kill_value);
	
	//AddMoney(kill_value, Factions.PLAYER);
	
	
}

function HitTarget()
{

	destroyed = true;
	
	MANAGER.SpaceshipHitTarget(damage);
	MANAGER.Total_damage_on_player(damage);
	
	//AddMoney(kill_value, Factions.PLAYER);
	
	
}

function IsDestroyed()
{
	return destroyed;
}

function LateUpdate()
{
	if (destroyed)
		Destroy(gameObject);
		//gameObject.active = false;
}


///////////////////////////// FACTION CONTROLLERS ///////////////

function SetFaction (fac : Factions)
{
	faction = fac;
}

/////////////////////////////// SOUNDS //////////////////////////



function ConfigureAudioSource()
{
	audioSource = GetComponent(AudioSource);
}

function PlaySound(_sound : SoundIndex)
{
	if (sound_array[_sound])
		audioSource.PlayOneShot(sound_array[_sound]);
	
}


