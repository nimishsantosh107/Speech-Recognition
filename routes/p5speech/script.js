function appendList (string) {
	var li = document.createElement("li")
	li.innerText = string;
	textList.appendChild(li);
}

function createP (string) {
	speechP.innerText = string;
}

function gotSpeech (argument) {
	if(speechRec.resultValue){
		createP(speechRec.resultString);
	}
}


var lang = 'en-IN';
var speechRec = new p5.SpeechRec(lang ,gotSpeech);
var continuous = true;
var interim = true;
speechRec.start(continuous, interim);
