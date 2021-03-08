// 1. Navigation - done
// 2. Global variables - done
// 3. Start/stop camera - done
// 4. Record - done
// 5. Play - done
// 6. Download - done
// 7. Snapshot - done
// 8. Add event listeners - done

let recordedBlobs;
let mediaRecorder;

const errorMsgElement = document.querySelector('span#errorMsg');
const startButton = document.querySelector('button#start');
const gumVideo = document.querySelector('video#gum');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
const takeSnapshotButton = document.querySelector('button#snapshot');
const canvas = document.querySelector('canvas');
const filterSelect = document.querySelector('select#filter');

// Take snapshot
takeSnapshotButton.addEventListener('click', () => {
    canvas.className = filterSelect.value;
    canvas.getContext('2d').drawImage(gumVideo, 0, 0, canvas.width, canvas.height);
});

// Download
downloadButton.addEventListener('click', () => {
    const buffer = new Blob(recordedBlobs, {type: 'video/webm'});
    const url = window.URL.createObjectURL(buffer);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.mp4';
    document.body.appendChild(a);
    a.click();
})

// Play record
playButton.addEventListener('click', () => {
    const buffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(buffer);
    recordedVideo.controls = true;
    recordedVideo.play();
})

// Start record
recordButton.addEventListener('click', () => {
    if(recordButton.innerText === 'Record') {
        startRecording();
    } else {
        stopRecording();
        recordButton.innerText = 'Record';
        playButton.disabled = false;
        downloadButton.disabled = false;
    }
})

function startRecording() {
    recordedBlobs = [];
    let options = {mimeType: 'video/webm;codecs=vp9,opus'};
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (error) {
        errorMsgElement.innerText = 'Media Recorder error: ' + error;
    }

    recordButton.innerText = 'Stop Recording';
    playButton.disabled = true;
    downloadButton.disabled = true;
    takeSnapshotButton.disabled = false;
    mediaRecorder.onstop = () => {
        console.log('Recorded blobs ' + recordedBlobs);
    }
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
}

function handleDataAvailable(event) {
    if(event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function stopRecording() {
    mediaRecorder.stop();
}

// Initialization of video stream
startButton.addEventListener('click', () => {
    if(startButton.innerText === 'Start Camera') {
        startButton.innerText = 'Stop Camera';
        const constraints = {
            audio: false,
            video: {
                width: 1280,
                height: 720
            }
        }
        init(constraints);
    } else {
        startButton.innerText = 'Start Camera';
        recordButton.disabled = true;
        playButton.disabled = true;
        recordedVideo.src =  null;
        recordedVideo.srcObject = null;
        recordedVideo.style.display = 'none';
        downloadButton.disabled = true;
        takeSnapshotButton.disabled = true;
        window.stream = null;
        gumVideo.srcObject = null;
    }
});

function init(constraints) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => handleSuccess(stream))
        .catch(error => handleError(error))
}

function handleSuccess(stream) {
    recordButton.disabled = false;
    takeSnapshotButton.disabled = false;
    console.log('stream', stream);
    window.stream = stream;
    gumVideo.srcObject = stream;
    gumVideo.onloadedmetadata = function() {
        gumVideo.play();
    };
}

function handleError(error) {
    console.error('navigator.getUserMedia' + error);
    errorMsgElement.innerHTML = 'navigator.getUserMedia error:${error}';
}

// Initialization of video stream
startButton.addEventListener('click', () => {
    const hasEchoCancellation = document.querySelector('#echoCancellation').checked;
    const constraints = {
        audio: {
            echoCancellation: {
                exact: hasEchoCancellation
            }
        },
        video: {
            width: 1280,
            height: 720
        }
    }
    init(constraints)
})