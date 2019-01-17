var GAME_VERSION : String = "TOWER_DEFENSE V1.0";

enum Factions { PLAYER = 0, ENEMY = 1, NEUTRAL = 2 };
enum SoundIndex { FIRE = 0 };
enum IState { POS_INI, POS_TOW, COM_INI, END_GAME, MENU};
enum Difficulty {EASY, NORMAL, HARD};

var starting_money : int;

var tower_list : GameObject[];
var tower_list_size : int;

var enemy_list : GameObject[];

var next_wave : Array;
var fixed_wave : Array;
var WAVE_LEVEL : int = 1;

var STARTING_LIFE : int = 100;

var difficulty = Difficulty.NORMAL;

//////////////////

var texture_GAME_OVER : Texture2D;

private var estado : IState = IState.MENU;
private var money : int;


private var tower_selected : GameObject;
private var tower_buildable : boolean = false;
private var tower_script : Tower;


private var TowerMenu;

private var logger : Logger;

private var start_object : GameObject;
private var end_object : GameObject;

private var MAX_WAVES = 10;

//////////////////////////////////
// LOGGER PARAMETERS

private var total_damage_on_enemies : int;
private var total_damage_on_player : int;

private var total_enemies_spawned : int;
private var total_enemies_killed : int;

private var total_money_spent : int;

private var towers_built : int[] = new int[6];


private var mosca : int = 0;
private var formiga : int = 1;
private var barata : int = 2;
private var zangao : int = 3;
private var besouro : int = 4;
private var rainha : int = 5;

function Total_damage_on_enemies (damage : int)
{
	total_damage_on_enemies += damage;
}

function Total_damage_on_player (damage : int)
{
	total_damage_on_player += damage;
}

function Total_enemies_killed ()
{
	total_enemies_killed++;
}

function Total_enemies_spawned (spaw : int)
{
	total_enemies_spawned += spaw;
}

function Total_money_spent (mon : int)
{
	total_money_spent += mon;
}

function Towers_built (ind : int)
{
	towers_built[ind]++;
}

function Awake()
{
	logger = GameObject.FindWithTag ("Manager").GetComponent("Logger");
	
	
}


class GUIMenu
{
	var title : String;
	var x : int;
	var y : int;
	var width : int;
	var height : int;
	
	var but_width : int;
	var but_height: int;
	
	var buttons:int;
	
	function GUIMenu()
	{
		title = "default menu";
		x = 0;
	 	y = 0;
	 	width = 100;
	 	height = 100;
	
	 	but_width = 0;
	 	but_height = 0;
	 
	 	buttons = 0;
	}
	
	function GUIMenu(Dtitle: String, Dx:int, Dy:int, Dwidth:int, Dheight:int, Dbut_width:int, Dbut_height:int, Dbuttons:int)
	{
	title = Dtitle;
	
	 x = Dx;
	 y = Dy;
	 width = Dwidth;
	 height = Dheight;
	
	 but_width = Dbut_width;
	 but_height = Dbut_height;
	 
	 buttons = Dbuttons;
		
	}
	
	function ShowMenu(obj : GameObject[]) : int
	{
	GUI.Box(Rect(x,y,width,height+40),title);
	GUILayout.BeginArea (Rect (x,y+30,width,height));
	   GUILayout.BeginVertical();
        for (var i = 0; i < buttons; i++)
            if( GUILayout.Button(GUIContent (obj[i].name, obj[i].GetComponent(Tower).cost.ToString())))
			   	 	return i;
        GUILayout.Box(GUI.tooltip); 
      GUILayout.EndVertical();
     GUILayout.EndArea();
     
     return -1;
		
	}
}




function InitMoney()
{
	money = starting_money;
}


function AddMoney(val : int, fac : Factions)
{
	money += val;
	
}

private function SubtractMoney(val : int, fac : Factions)
{
	money -= val;
}

function SpendMoney(val : int, fac : Factions) : boolean
{
	if (money < val)
		return false;
	
	SubtractMoney(val, fac);
	return true;
	
}




function Start()
{
	next_wave = new Array();
	
	
	InitMoney();
	
	InitMenu();
	
	
	start_object = GameObject.FindGameObjectWithTag("Start");
	end_object = GameObject.FindGameObjectWithTag("End");
	
	logger.Log(GAME_VERSION);
	
	for (var i = 0; i < tower_list_size; i++)
	{
		tower_list[i].GetComponent("Tower").ResetCost();
	}
	
	
	

	
}

function EndGame()
{
	estado = IState.END_GAME;
	
	logger.Log("=================================");
	logger.Log("           GAME OVER             \n");
	
	logger.Log("DAMAGE ON PLAYER" + total_damage_on_player);
	logger.Log("DAMAGE ON ENEMIES: " + total_damage_on_enemies);
	
	logger.Log("ENEMIES SPAWNED: " + total_enemies_spawned);
	logger.Log("ENEMIES KILLED: " + total_enemies_killed);
	logger.Log("\nTOWERS BUILT:");
	logger.Log("ATIRADORA: " + towers_built[0]);
	logger.Log("EXPLOSIVA: " + towers_built[1]);
	logger.Log("MATADORA: " + towers_built[2]);
	logger.Log("DEBILITADORA: " + towers_built[3]);
	logger.Log("DEFENSORA: " + towers_built[4]);
	logger.Log("DESTRUIDORA: " + towers_built[5]);
	
	

	
}



function AddEnemies(index : int, number : int)
{
	for (i = 0; i < number; i++)
				next_wave.Push(enemy_list[index]);
}


function ConfigureWave()
{

	next_wave.Clear();
	
	//AddEnemies(mosca, 20);
	//return;
	
	
	switch (WAVE_LEVEL)
	{
		case 1:
			AddEnemies(mosca, 5);
			break;
		
		case 2:
			AddEnemies(formiga, 3);
			AddEnemies(mosca, 5);
			AddEnemies(formiga, 3);
			break;
		
		case 3:
			AddEnemies(formiga, 5);
			AddEnemies(mosca, 5);
			AddEnemies(formiga, 5);
			AddEnemies(barata, 1);
			break;
		
		case 4:
			AddEnemies(barata, 1);
			AddEnemies(formiga, 8);
			AddEnemies(mosca, 3);
			AddEnemies(formiga, 8);
			AddEnemies(mosca, 3);
			
			break;
		
		case 5:
			AddEnemies(formiga, 8);
			AddEnemies(barata, 2);
			AddEnemies(zangao, 3);
			break;
		
		case 6:
			AddEnemies(zangao, 3);
			AddEnemies(formiga, 3);
			AddEnemies(mosca, 5);
			AddEnemies(formiga, 3);
			AddEnemies(zangao, 3);
			
			
			break;
			
		case 7:
			AddEnemies(besouro, 1);
			AddEnemies(barata, 3);
			AddEnemies(zangao, 3);
			AddEnemies(barata, 4);
			
			
			break;
			
		case 8:
		
			AddEnemies(barata, 2);
			AddEnemies(mosca, 5);
			AddEnemies(formiga, 5);
			AddEnemies(besouro, 1);
			AddEnemies(barata, 2);
			AddEnemies(formiga, 5);
			AddEnemies(mosca, 5);
			AddEnemies(zangao, 6);
			AddEnemies(barata, 6);
					
			break;
			
		case 9:
			
			AddEnemies(besouro, 2);
			AddEnemies(zangao, 3);
			AddEnemies(barata, 8);
			AddEnemies(besouro, 1);
			AddEnemies(zangao, 5);
			AddEnemies(barata, 12);
			//AddEnemies(besouro, 3);
			 
			break;
			
		case 10:
		
			AddEnemies(zangao, 8);
			AddEnemies(besouro, 2);
			AddEnemies(zangao, 12);
			AddEnemies(besouro, 2);
			AddEnemies(rainha, 1);
			AddEnemies(zangao, 12);
			
			
			break;
	}

	

}

function InitMenu()
{

	TowerMenu = new GUIMenu();
	TowerMenu.title = "Towers";
	TowerMenu.x = Screen.width * 0.9;
	TowerMenu.y = Screen.height * 0.1;
	TowerMenu.width = 100;
	TowerMenu.height = 180;
	TowerMenu.but_width = 80;
	TowerMenu.but_height = 80;
	TowerMenu.buttons = tower_list_size;
	
	
	
	
}


function Update()
{
	switch (estado)
	{
	case IState.POS_INI:
	
		Player_INI();
		break;
				
	
	case IState.POS_TOW:
	
		Player_TOWER();	
		break;
		
	case IState.COM_INI:
		
		Enemy_INI();
		break;
		
	}
	
	
}

function CheckEndGameConditions()
{
	if ((WAVE_LEVEL > MAX_WAVES) || (STARTING_LIFE <= 0))
	{
		EndGame();
	}
}

function Player_INI()
{
}

function Player_TOWER()
{
}


private var timer : float = 1;
private var iterator : int = 0;
private var can_spawn : boolean = true;

function Enemy_INI()
{

	//Debug.Log(next_wave.ToString());
	CheckEndGameConditions();
	
	if (iterator < next_wave.length)
	{
	
		SpawnEnemies();
	}
	
	else 
	{
		for (var i = 0; i < next_wave.length; i++)
		{
			
//			if (next_wave[i])
//			{
//				var spaceship : Spaceship = next_wave[i].GetComponent("Spaceship");
//			
//				if (spaceship.IsDestroyed())
//				{
//					AddMoney(spaceship.kill_value, Factions.PLAYER);
//					
//					next_wave.RemoveAt(i);
//				}
//			}

			if (next_wave[i] == null)
			{
				next_wave.RemoveAt(i);
				Total_enemies_killed();
			}
		}
		
		if (next_wave.length <= 0)
		{
		
			CallNextRound();
		
		}
	}
		
}

function SpaceshipDestroyed(kill_value : int)
{
	AddMoney(kill_value, Factions.PLAYER);
	
}

function SpaceshipHitTarget(damage : int)
{

	STARTING_LIFE -= damage;
	
}


function SpawnEnemies()
{
	if (timer <=0)
		{
			
			//Debug.Log(iterator);
													
			next_wave[iterator] = Instantiate(next_wave[iterator], start_object.transform.position, Quaternion.Euler(0,180,0));
			next_wave[iterator].transform.position.y += next_wave[iterator].collider.bounds.size.y;
			
			switch (difficulty)
			{
				case Difficulty.EASY:
					next_wave[iterator].SendMessage ("AdjustToEasy");
					break;
				
				case Difficulty.HARD:
					next_wave[iterator].SendMessage ("AdjustToHard");
			}
			
			
			//Debug.Log(next_wave[iterator].collider.bounds.size.y);
			
			Total_enemies_spawned(1);
			
			if (iterator+1 < next_wave.length)
			{
				var next_spaceship : Spaceship = next_wave[iterator+1].GetComponent("Spaceship");
				ResetTimer(next_spaceship.spawn_time);
				//Debug.Log(next_spaceship.spawn_time);
			}
			
			
			else
			{
				ResetTimer(1);
			}
			
			iterator++;
	
		}
	
		else
			timer -= Time.deltaTime;
		
	
	
	
	
}

function CallNextRound()
{
	if ((WAVE_LEVEL >= 1)|| (WAVE_LEVEL <= MAX_WAVES))
	
		WAVE_LEVEL += 1;
	else
		WAVE_LEVEL = 1;
	
	ConfigureWave();
	
	fixed_wave =  new Array (next_wave);
	
	estado = IState.POS_INI; 
	
	timer = 1;
	iterator = 0;
	
	logger.Log("=================================");
	logger.Log("        WAVE " + WAVE_LEVEL + " START");
	for (var i = 0; i < next_wave.length; i++)
	{
		logger.Log(next_wave[i].name);
	}
	
	logger.Log("\nCurrent money: " + money);
	logger.Log("Current life: " + STARTING_LIFE + "\n");
	
	
}

function ResetTimer(time : float)
{
	timer = time;
}



function OnGUI()
{

	var x = 10;
	
	GUI.Box (Rect (x,2,200,20), (GAME_VERSION));
	GUI.Box (Rect (x,32,200,20), ("RECURSOS : " + money));
	GUI.Box (Rect (x,62,200,20), ("PONTOS DE VIDA : " + STARTING_LIFE));
	
	if (fixed_wave)
	{
		//GUI.Box(Rect(x, Screen.height * 0.1,100,20),"Próxima onda");
		GUILayout.BeginArea (Rect (x,92,100,fixed_wave.length*50));
		   GUILayout.BeginVertical();
		   	//GUILayout.Box("ONDA");
	        for (var i = 0; i < fixed_wave.length; i++)
	            GUILayout.Box(fixed_wave[i].name);  
	      GUILayout.EndVertical();
	     GUILayout.EndArea();
     }
	
	if ((GUI.Button(Rect(Screen.width * 0.8, Screen.height*0.9, 50,50), "QUIT")))
	{
		EndGame();
	}
	
	
	
	
	
	switch (estado)
	{
	
	case IState.MENU:
		Interface_Menu();
		break;
		
	case IState.POS_INI:
	
		Interface_Player_INI();
		break;
				
	
	case IState.POS_TOW:
	
		Interface_Player_TOWER();	
		break;
		
	case IState.COM_INI:
		
		Interface_Enemy_INI();
		break;
		
	case IState.END_GAME:
		Interface_Game_Over();
		break;
		
	}

	
}

function Interface_Menu()
{

  GUI.Box(Rect(Screen.width/2,Screen.height*0.4,200,100),"Escolha Dificuldade");
	GUILayout.BeginArea (Rect (Screen.width/2,Screen.height/2,200,600));
	   GUILayout.BeginVertical();
         	if( GUILayout.Button("EASY"))
         	{
         		difficulty = Difficulty.EASY;
         		AddMoney(600,Factions.PLAYER);
         		estado = IState.POS_INI;
         		logger.Log("DIFFICULTY: EASY");
         		CallNextRound();
         	}
         	if( GUILayout.Button("NORMAL"))
         	{
         		difficulty = Difficulty.NORMAL;
         		estado = IState.POS_INI;
         		logger.Log("DIFFICULTY: NORMAL");
         		CallNextRound();
         		AddMoney(500,Factions.PLAYER);
         	}
         	if( GUILayout.Button("HARD"))
         	{
         		difficulty = Difficulty.HARD;
         		estado = IState.POS_INI;
         		AddMoney(400,Factions.PLAYER);
         		logger.Log("DIFFICULTY: HARD");
         		CallNextRound();
         	}
       
      GUILayout.EndVertical();
     GUILayout.EndArea();
	
}

var tower_index : int;

function Interface_Player_INI()
{

	var clicked : int = TowerMenu.ShowMenu(tower_list);
	tower_index = clicked;
	
	
							
		if ((clicked != -1) && (money >= tower_list[clicked].GetComponent("Tower").cost)) 
		{
			//Debug.Log(tower_list[clicked].name);
			//estado = 
			tower_selected = Instantiate(tower_list[clicked], Vector3(0,0,0) ,Quaternion.identity);
			tower_script = tower_selected.GetComponent("Tower");
			tower_script.SwitchState("enable");
			tower_buildable = false;
			estado = IState.POS_TOW;
			
			 
		}
		
		if ((GUI.Button(Rect(Screen.width/2 - 150, Screen.height*0.9, 300,50), "BEGIN NEXT WAVE"))
			||
			(Input.GetKey(KeyCode.Space)))
		{
			estado = IState.COM_INI;
		}
		
		//GUI.Label (Rect (Input.mousePosition.x + 30,Input.mousePosition.y,100,20), GUI.tooltip);
	
}

var building : Building;

function Interface_Player_TOWER()
{
	var hit : RaycastHit = MouseRayPosition();

	if (tower_selected != null)
	{
			if ((hit.collider) && (hit.collider.bounds.extents.y + hit.transform.position.y == hit.point.y))
				if (hit.collider.tag == "Building")
				{
					var building = hit.collider.gameObject.GetComponent("Building");
					if (building.buildable)
					{
						tower_script.SwitchState("enable");
						//tower_buildable = true;
					
						tower_script.Reposition(building.pos);
						
						if ((Input.GetMouseButton(0)) && (SpendMoney(tower_script.cost, Factions.PLAYER)))
						{
							if (building)
							{
								building.buildable = false;
								building = null;
							}
								
								//tower_buildable = false;
								
								tower_script.SwitchState("active");
								
								logger.Log("TOWER BUILT: " + tower_selected.name);
								
								
								
								
								tower_selected = null;
								tower_script = null;
								
								estado = IState.POS_INI;
								
								Towers_built(tower_index);
								tower_list[tower_index].GetComponent("Tower").AdjustCost();
						}
					}
					//tower_selected.transform.position = Vector3(hit.point.x, hit.point.y + tower_selected.collider.bounds.extents.y, hit.point.z);
				}
				else if (hit.collider.tag == "Plane")
				{
					tower_script.SwitchState("disable");
					tower_buildable = false;
					tower_script.Reposition(hit.point);
					//tower_selected.transform.position = Vector3(hit.point.x, hit.point.y + tower_selected.collider.bounds.extents.y, hit.point.z);
				}
			
			
	}
		
//	if ((tower_buildable) && (Input.GetMouseButton(0)) && (SpendMoney(tower_script.cost, Factions.PLAYER)))
//	{
//		if (building)
//		{
//			building.buildable = false;
//			building = null;
//		}
//			
//			tower_buildable = false;
//			
//			tower_script.SwitchState("active");
//			
//			logger.Log("TOWER BUILT: " + tower_selected.name);
//			
//			
//			tower_selected = null;
//			tower_script = null;
//			
//			estado = IState.POS_INI;
//			
//			Towers_built(tower_index);
//	}
		
	if (Input.GetMouseButton(1))
		{
			Destroy(tower_selected);
			
			tower_selected = null;
			tower_script = null;
			
			estado = IState.POS_INI;
			
		}
}

function Interface_Enemy_INI()
{
}

function Interface_Game_Over()
{

	 GUI.DrawTexture(Rect(Screen.width * 0.2,Screen.height * 0.2 ,800,600), texture_GAME_OVER, ScaleMode.ScaleToFit, true, 0);
	
}

function MouseRayPosition() : RaycastHit
{
			var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hit : RaycastHit;
			if (Physics.Raycast (ray, hit, 1000))
			{	
				Debug.DrawRay (ray.origin, hit.point, Color.blue);
				return hit;
			}

}


