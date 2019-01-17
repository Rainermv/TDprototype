var selection_box : GameObject;
private var currentBox : GameObject;
private var clickStart : Vector3;
private var clickFinish : Vector3;
var clicked : boolean = false;
var dragging : boolean = false;

function Update () {

	CheckInput();
	
	if (clicked)
		MakeBox();
	
	if (dragging)
		UpdateBox();
}

function CheckInput()
{
	if (Input.GetMouseButtonDown(0))
	{
		clicked = true;
	}
	
	if (Input.GetMouseButton(0))
	{
		dragging = true;
	}
	
	if( Input.GetMouseButtonUp(0))
	{
		dragging = false;
		Destroy(currentBox);
		//currentBox.GetComponent(SelectionBox).deselect = false;
	}
	
}

function MakeBox()
{
	var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit : RaycastHit;
	if (Physics.Raycast (ray, hit, 1000))
		{	
				Debug.DrawRay (ray.origin, hit.point, Color.yellow);
				var position : Vector3;
				clickStart = hit.point;
				clickStart.y = 0;
				
				/// MOVE OBJECT
				//Debug.Log(position);
								
				currentBox = Instantiate(selection_box, clickStart, Quaternion.identity);
								
		}
	clicked = false;
	
	//electionBox,
}

function UpdateBox()
{
	if (currentBox)
	{
	
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hit : RaycastHit;
		if (Physics.Raycast (ray, hit, 1000))
		{	
				Debug.DrawRay (ray.origin, hit.point, Color.yellow);
				var position : Vector3;
				clickFinish = hit.point;
				clickFinish.y = 0;
				
				/// MOVE OBJECT
				//Debug.Log(position);
								
				currentBox.transform.localScale = clickStart - clickFinish;
				currentBox.transform.localScale.y = 5;
				currentBox.transform.position = ((clickFinish - clickStart)*0.5f) + clickStart;				
		}
		
	}
}

