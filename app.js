// Constrains for video stream
let constrains = {
	video: {
		facingMode: "environment",
	},
	audio: false,
};

// Constants
const cameraView    = document.querySelector("#camera--view");
const cameraOutput  = document.querySelector("#camera--output");
const cameraSensor  = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");


/**
 * Access the divece camera and video stream for cameraView
*/
function cameraStart() {
	navigator.mediaDevices
		.getUserMedia(constrains)
		.then((stream) => {
			track = stream.getTracks()[0];
			cameraView.srcObject = stream;
		})
		.catch((err) => {
			console.error('Looks like something went wrong!' , err);
		})
}

/**
 * Take a picture when cameraTrigger is tapped
 */
cameraTrigger.onClick = () => {
	cameraSensor.width = cameraView.videoWidth;
	cameraSensor.height = cameraView.videoHeight;
	cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);

	cameraOutput.src = cameraSensor.toDataURL('image/webp');
	cameraOutput.classList.add('taken');
};

// Start video stream when the window loads
window.addEventListener('load', cameraStart, false);
