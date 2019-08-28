function appendList (string) {
	var li = document.createElement("li")
	li.innerText = string;
	textList.appendChild(li);
}


function gotSpeech (argument) {
	if(speechRec.resultValue){
		appendList(speechRec.resultString);
	}
}


var lang = navigator.language || 'en-US'
var speechRec = new p5.SpeechRec(lang ,gotSpeech);
var continuous = true;
var interim = false;
speechRec.start(continuous, interim);
