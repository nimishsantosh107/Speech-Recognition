function startRecording() {
    rec.record();
    recordButton.disabled = true;
    stopButton.disabled = false;
    console.log("Recording started");
}


function stopRecording() {
    recordButton.disabled = false;
    stopButton.disabled = true;
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

    au.controls = true;
    au.src = url;

    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;

    //UPLOAD
    var filename = new Date().toISOString(); //ADD EXT IF NEEDED
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
    //UPLOAD

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

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

var constraints = {
    audio: true,
    video: false
} 

//initially both disabled
recordButton.disabled = true;
stopButton.disabled = true;

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