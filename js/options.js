function save_options() {
	var host = document.getElementById("host");
	localStorage["cairImageHost"] = host.value;

	var status = document.getElementById("status1");
	status.innerHTML = "Localhost saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 2000);

	var bkg = chrome.extension.getBackgroundPage();
	bkg.startup();

}

function restore_options() {
	var host = localStorage["cairImageHost"];
	if (!host) {
		return;
	}
	document.getElementById("host").value = host;

}

function readDirectory(evt) {
	var files = evt.target.files, imgs = {};
	for ( var f = 0, c = files.length; f < c; f++) {
		imgs[files[f].name] = true;
	}
	console.log(imgs);
	localStorage["cairImages"] = JSON.stringify(imgs);
	var status = document.getElementById("status2");
	status.innerHTML = "Image list saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 2000);
	var bkg = chrome.extension.getBackgroundPage();
	bkg.startup();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('input[type="file"]').addEventListener('change', readDirectory);
