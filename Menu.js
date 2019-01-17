
function Update () {
}


enum MenuState { MAIN, CAMPAIGN, SELECT, QUIT};

var estado : MenuState = MenuState.MAIN;

	var butsizex = 160;
	var butsizey = 30;

function OnGUI()
{

	var tamanhox = 200;
	var tamanhoy = 300;
	var posx = (Screen.width - tamanhox) * 0.1;
	var posy = (Screen.height - tamanhoy) /2;
	
	if (estado == MenuState.MAIN)
	{
		
		GUI.Box(Rect(posx, posy, tamanhox, tamanhoy), "MENU PRINCIPAL");
		
		
		posx += 20;
		posy += 30;
		tamanhox = 160;
		tamanhoy = 30;
		
		if (GUI.Button(Rect(posx, posy, butsizex, butsizey), "NOVA CAMPANHA"))
		{
			//Application.LoadLevel(1);
			estado = MenuState.CAMPAIGN;
		
		}
		
		posy +=40;
		
		if (GUI.Button(Rect(posx, posy, butsizex, butsizey), "ESCOLHER MISSÃO"))
		{
			estado = MenuState.SELECT;	
		
		}
		
		posy +=40;
		
		if (GUI.Button(Rect(posx, posy, butsizex, butsizey), "SAIR"))
		{
			estado = MenuState.QUIT;
		
		}
		
		
	}
	else if (estado == MenuState.CAMPAIGN)
	{
	}
	else if (estado == MenuState.SELECT)
	{
		tamanhox = 200;
		tamanhoy = 20;
		posx = (Screen.width - tamanhox) * 0.1;
		posy = (Screen.height - tamanhoy) * 0.1;
		
		GUI.Box(Rect(posx, posy, tamanhox, tamanhoy), "ESCOLHER MISSÃO");
		
		////////////////////////////////////////////
		//posx += 50;
		posy += 30 +tamanhoy;
		tamanhox = 800;
		tamanhoy = 150;
		
				
		GUI.Box(Rect(posx, posy, tamanhox, tamanhoy), "MISSÃO 1 : Campo de Treinamento");
		
		posy += 15;
												
		GUI.Label(Rect(posx, posy, tamanhox, tamanhoy), "Construa sua reputação e destrua seus inimigos.\n\nOBJETIVOS\n   - Use suas naves para matar todos!!!");
		//GUI.Label(Rect(posx, posy, tamanhox, tamanhoy), "OBJETIVOS");
		
		
		posy += tamanhoy ;
			
		
		if (GUI.Button(Rect(posx, posy- (butsizey * 1.5), butsizex, butsizey), "Lançar missão"))
		{
			Application.LoadLevel(1);
			
		}
		
		////////////////////////////////////////////////////////////
		
		//posx += 50;
		posy += 30 +tamanhoy;
		tamanhox = 800;
		tamanhoy = 150;
		
				
		GUI.Box(Rect(posx, posy, tamanhox, tamanhoy), "MISSÃO 1 : Campo de Treinamento");
		
		posy += 15;
												
		GUI.Label(Rect(posx, posy, tamanhox, tamanhoy), "Construa sua reputação e destrua seus inimigos.\n\nOBJETIVOS\n   - Use suas naves para matar todos!!!");
		//GUI.Label(Rect(posx, posy, tamanhox, tamanhoy), "OBJETIVOS");
		
		
		posy += tamanhoy ;
			
		
		if (GUI.Button(Rect(posx, posy- (butsizey * 1.5), butsizex, butsizey), "Lançar missão"))
		{
			Application.LoadLevel(1);
			
		}
		
		
		if (GUI.Button(Rect(posx, posy, butsizex, butsizey), "VOLTAR"))
		{
		
			estado = MenuState.MAIN;
		
		}
				
		
		
	}
	
	else if (estado == MenuState.QUIT)
	{
	}
	

}