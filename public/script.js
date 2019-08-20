function startRecording() {
	//start the recording process 
    rec.record()
    stopButton.disabled = false;
    console.log("Recording started");
}


function stopRecording() {
    stopButton.disabled = true;
    recordButton.disabled = false;
    //tell the recorder to stop the recording 
    rec.stop(); //stop microphone access 
    gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink 
    rec.exportWAV(createDownloadLink);
}


function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    //add controls to the <audio> element 
    au.controls = true;
    au.src = url;
    //link the a element to the blob 
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;
    //add the new audio and a elements to the li element 

    var filename = new Date().toISOString(); //ADD EXT IF NEEDED
	//filename to send to server without extension 
	//upload link 
	var upload = document.createElement('a');
	upload.href = "#";
	upload.innerHTML = "Upload";
	upload.addEventListener("click", function(event) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function(e) {
	        if (this.readyState === 4) {
	            console.log("Server returned: ", xhr.response);
	        }
	    };
	    var fd = new FormData();
	    fd.append("audio_data", blob, filename);
	    xhr.open("POST", "/#", true);
	    xhr.send(fd);
	})
    li.appendChild(upload);
    li.appendChild(au);
    li.appendChild(link);
    //add the li element to the ordered list 
    recordingsList.appendChild(li);
}


URL = window.URL
var gumStream;
var rec;
var input;
var AudioContext = window.AudioContext;
var audioContext = new AudioContext;

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

var constraints = {
    audio: true,
    video: false
} 

recordButton.disabled = true;
stopButton.disabled = false;

navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
    /* assign to gumStream for later use */
    gumStream = stream;
    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);
    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
    rec = new Recorder(input, {
        numChannels: 1
    });
    recordButton.disabled = false;
}).catch(function(err) {
    console.log(err);
});