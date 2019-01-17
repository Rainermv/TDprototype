
var spaceship: Spaceship; 
private var builder: Builder;

//var mesh: GameObject;
var selection: GameObject;
private var sel;

private var marker: Renderer;
private var player_color : Color;


private var cam : Camera;


private var isSelected : boolean;
private var isMouseOver : boolean;
private var controlKey : boolean;


/// builder ////
var button_size : float = 40;

private var isBuilder : boolean;
private var interfaceState = 1;

var buildings;
var building_names;

var GUIbuttons : Texture2D[];

////



function Awake()
{
	spaceship = GetComponent(Spaceship);
	cam = GameObject.Find("_cam_Main Camera").camera;
	builder = GetComponent(Builder);
}

function Start()
{	
	//selectionManager.AddUnit(GetComponent(GameObject));
	
				
	isSelected = false;
	isMouseOver = false;
	
	ConfigColor();
	//ConfigSelector();
	
	 
	/// builder ////
	if (builder != null)
	{
		ConfigBuilder(); 
	}
	 
}

function ConfigColor()
{
	player_color = spaceship.GetFactionColor();
	
	sel = transform.Find("_obj_SelectionMarker").GetComponent(Renderer);
	
	if (marker)
		marker = spaceship.minimap_mark;
	
	if (sel)
	{
		sel.enabled = false;
		sel.material.color = player_color;
	}
		
	
	
}


function ConfigBuilder()
{
	isBuilder = true;
	
	var buildings = builder.GetBuildingsArray();
	
	building_names = new Array();
	
	for (var i = 0; i < buildings.length; i++)
	{
		
		building_names.push(buildings[i].gameObject.name);
//		Debug.Log(building_names[i]);
	}
	
	
}

function Update () {

	checkInput();
	
	
	if (isSelected)	
	{
		if (selection != null)
	 		//selection.renderer.enabled = true;
	 		sel.enabled = true;
	 	
	 	if (marker != null)
	 		marker.material.color = Color.green;
	 	
		//transform.Find("_MESH").GetComponent(Renderer).material.color = Color.green;
	}
	else 
	{
		if (selection != null)
	 		selection.renderer.enabled = false;
		
		if (marker != null)
	 		marker.renderer.material.color = player_color;
		
	}
	
	////////////////// builder //////////////
	
		

}

function checkInput()
{

	if (Input.GetKey(KeyCode.LeftControl))
		controlKey = true;
	else
		controlKey = false;
	
	
	
	if (Input.GetMouseButtonDown(0))
	{
		if (isMouseOver)
		{
			if (controlKey)
				isSelected = true;
			else
				isSelected = true;//!isSelected;
		}	
		
		else if (!controlKey)
		  isSelected = false;
						
	}
	
	
	if (Input.GetMouseButton(1))
	{
		if (isSelected){
			var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			var hit : RaycastHit;
			if (Physics.Raycast (ray, hit, 1000))
			{	
				Debug.DrawRay (ray.origin, hit.point, Color.yellow);
				var position : Vector3;
				position = hit.point;
				position.y = 0;
				
				/// MOVE OBJECT
				//Debug.Log(position);
								
				spaceship.MoveTo(position);
								
			}
		}
	}	
	
		
}

function OnMouseEnter () {
	isMouseOver = true;
	Debug.Log("mouse over " + name);
}

function OnMouseExit () {
	isMouseOver = false;
}

////////////////////////////// BUILDER //////////////////////////

function OnGUI(){


  if ((isBuilder) && (spaceship.GetState() == SSstate.ACTIVE))
   	 {
   	 var screen_height = camera.GetScreenHeight();
   	 var screen_pos = cam.WorldToScreenPoint(transform.position);
   	 
	   	 switch (interfaceState)
	   	 {
	   	 case 1:
	   	 	
	   	 		
				GUI.Button(Rect(screen_pos.x - button_size/2,  
	   	 					        screen_height - screen_pos.y - button_size/2 ,
	   	 					        button_size,
	   	 					        button_size),
	   	 					        GUIContent (GUIbuttons[0], "Open build options"));
	   	 		if (GUI.Button(Rect(screen_pos.x - button_size/2,  
	   	 					        screen_height - screen_pos.y - button_size/2 ,
	   	 					        button_size,
	   	 					        button_size),
	   	 					        GUIContent (GUIbuttons[0], "Open build options"))) 
	   					interfaceState = 2;
	   			
	   			//GUI.DrawTexture(
	   			GUI.Label (Rect (Input.mousePosition.x + 10,screen_height - Input.mousePosition.y,100,20), GUI.tooltip);
	   			
	   			break;
	   			
	   	
 		
	   			
	   	case 2:
	   		
	   			   		
	   		for (var i = 0; i < building_names.length; i++)
	
	   			{
	   			if (GUI.Button(Rect(screen_pos.x +i*button_size - button_size/2,  
	   	 					        screen_height - screen_pos.y -button_size/2 ,
	   	 					        button_size,
	   	 					        button_size),
	   	 					        GUIContent (GUIbuttons[1], "Build " + building_names[i] as String)))
	   	 			{		        
	   	 			Build(i);
	   	 			interfaceState = 1;
	   	 			}
	   	 		
	   				
	   		 	}
	   		 GUI.Label (Rect (Input.mousePosition.x + 10,screen_height - Input.mousePosition.y,200,20), GUI.tooltip);
	   		 break;
	   		
	   	}	
	}
}

function Build(index:int)
{
	var buildPosition = transform.position;
	buildPosition.z += 20;
	builder.BuildAtPosition(index, buildPosition);
			
}

/////////////////////////////////////////////


function IsSelected()
{
	return isSelected;
}

function Select()
{	
	isSelected = true;
	
}

function Deselect()
{
	isSelected = false;
}

function ToggleSelect()
{
	isSelected = !isSelected;
}


function IsMouseOver() 
{
	return isMouseOver;
}