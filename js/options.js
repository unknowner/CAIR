function save_options() {
	var host = document.getElementById("host");
	localStorage["cairImageHost"] = host.value;

	var images = document.getElementById("images");
	localStorage["cairImages"] = images.value;

	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
	
	var bkg = chrome.extension.getBackgroundPage();
	bkg.startup();
	
}

function restore_options() {
	var host = localStorage["cairImageHost"];
	if (!host) {
		return;
	}
	document.getElementById("host").value = host;
	var images = localStorage["cairImages"];
	if (!images) {
		return;
	}
	document.getElementById("images").value = images;

}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
