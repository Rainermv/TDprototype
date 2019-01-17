
var buildings : GameObject[];
private var buildings_array;
var buildIndex : int = 0;

private var spaceship : Spaceship;
private var gameManager : GameManager;

function Awake()
{
	spaceship = GetComponent(Spaceship);
	gameManager = GameObject.Find("Allmighty").GetComponent(GameManager);
}

function Start()
{
	buildings_array = new Array (buildings);

}

function GetBuildingsArray() : Array
{
	return buildings_array;
}

function BuildAtPosition(index:int, position:Vector3)
{
	
	if (buildings_array[index] != null)
	{
		if (gameManager.SpendMoney(100, spaceship.faction))
			{
			var building : GameObject = Instantiate(buildings_array[index],position,Quaternion.identity);
			building.GetComponent(Spaceship).StartBuilding();
			building.GetComponent(Spaceship).faction = spaceship.faction;
			//Debug.Log("Building");
			}
		}
	else
		Debug.Log("Building does not exist");
		
}

