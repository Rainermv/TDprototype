#pragma strict

import System.IO;

var game_version = "1.0";

var log_file : StreamWriter;


function Awake () {

	var time = System.DateTime.Now;
	
	var year = time.Year.ToString();
	var month = time.Month.ToString();
	var day = time.Day.ToString();
	var hour = time.Hour.ToString();
	var min = time.Minute.ToString();
	var sec = time.Second.ToString();
	
	Debug.Log(time);
	
	var rr : int = Random.Range(1,1000);


	var filePath = "/LogTD " + game_version + " " + year + month + day + " - " + hour + min + sec + ".txt";

	log_file = new StreamWriter(filePath);
	
	


}



function Update() {

}

 

function Log(line : String)
{

    log_file.WriteLine(line);

    log_file.Flush();

    //log_file.Close();
    
    Debug.Log(line);

}

function LogNewLevel(level : int)
{

	log_file.WriteLine("WAVE " + level + " START");

    log_file.Flush();
	
}

 

function ReadFile(filepathIncludingFileName : String) {

    var sr = new File.OpenText(filepathIncludingFileName);

 

    var input = "";

    while (true) {

        input = sr.ReadLine();

        if (input == null) { break; }

        Debug.Log("line="+input);

    }

    sr.Close();

}