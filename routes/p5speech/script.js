
/*
PLAY
PAUSE 
GO 		TO 	 time.	time.
VOLUME 	UP
		DOWN
*/

class TrieNode {
	constructor(string, homophones){
		this.string = string;
		this.homophones = homophones;
		this.children = [];
		this.end = false;
	}
}

var trieroot = new TrieNode("*",[]);
//LAYER 1
var play = new TrieNode("play",["play", "they", "way", "say", "pay", "pray", "away"]);
play.end = true;
var pause = new TrieNode("pause",["pause", "boss","pass","laws", "claws", "paws", "flaws", "paus", "shaws", "was", "cause"]);
pause.end = true;
var go = new TrieNode("go", ["go", "hoe", "doe"])
var volume = new TrieNode("volume", ["volume", "toluene", "column", "solemn", "costume", "on whom", "washroom", "was room"]);
//APPEND LAYER 1
trieroot.children.push(play,pause,go,volume);
//LAYER 2
var to = new TrieNode("to", ["to", "tu", "too", "two", "2", "do", "doo", "boo"]);
var up = new TrieNode("up", ["up", "cup", "sup", "pup", "yup", "upp", "supp", "krupp", "dupp", "rupp"]);
up.end = true;
var down = new TrieNode("down", ["down", "town", "around", "brown", "crown", "crowne", "noun", "frown", "clown", "drown"]);
down.end = true;
//APPEND LAYER 2
go.children.push(to);
volume.children.push(up,down);
//LAYER 3
var time = new TrieNode("NUM", ["1","2","3","4","5","6","7","8","9","0","."]);
time.end = true;
//APPEND LAYER 3
to.children.push(time);




//UTIL
function createPassage (string) {
	speechP.innerText = string;
}

//RETURN FILTERED COMMAND FROM SPEECH
function returnCommand (string) {
	var list = string.toLowerCase().split(" ");
	if(list.length > 5){ return false; }
	else {
		var curList = trieroot.children;
		var temp = [];
		for(var i =  0; i< list.length ; i++){
			if( i > 1){
				for(var k = i; k < list.length; k++){
					if(!isNaN(list[i])){
						temp.push(parseFloat(list[k]));
					}else {
						return false;
					}
				}
				return temp;
			}
			else{
				var flag = false;
				for(var j = 0; j< curList.length ; j++){
					if(curList[j].homophones.indexOf(list[i])!== -1){
						flag = true;
						temp.push(curList[j].string);
						if(curList[j].end){
							return temp;
						}else{
							curList = curList[j].children;
						}
					}
				}
				if(!flag){
					return false;
				}
			}
		};
        return false;
	}
}

//MAIN
function gotSpeech (argument) {
	if(speechRec.resultValue){
		clearTimeout(timeoutID);
		str = speechRec.resultString;
		timeoutID = setTimeout(function () {
			console.log(returnCommand(str));
			createPassage(str);
			str = "";
		}, 1200);
	}
}

var timeoutID;
var str = "";

var lang = 'en-IN';
var speechRec = new p5.SpeechRec(lang ,gotSpeech);
var continuous = true;
var interim = true;
speechRec.start(continuous, interim);

//NOTES

/*
<=5
*/

/*
go 245 ['go' , '245'] -LAST
[time. time. time][ '345.' , '123.']
*/





