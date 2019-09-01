const options = { probabilityThreshold: 0.92 };
const classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);

var wordStack = [];
var timeOutID;

function modelReady() {
	classifier.classify(gotResult);
}

function gotResult(error, result) {
	if (error) {
		console.log(error);
		return;
	}
	console.log(result[0]);
	clearTimeout(timeOutID);
	wordStack.push(result[0].label);
	timeOutID = setTimeout(function () {
		console.log(wordStack);
		wordStack = [];
	}, 5000);
}