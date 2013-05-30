var cairHost, cairImages;

function startup() {
	cairHost = localStorage["cairImageHost"];
	cairImages = localStorage["cairImages"];

	if (cairHost && cairImages) {
		cairImages = JSON.parse(cairImages);
		chrome.webRequest.onBeforeRequest.addListener(replacer, {
			urls : [
					"*://image4.castleagegame.com/*", "*://castleagegame1-a.akamaihd.net/*"
			],
			types : [
				"image"
			]
		}, [
			"blocking"
		]);
		console.log('started');
	} else {
		console.log('nope');
		chrome.webRequest.onBeforeRequest.removeListener(replacer);
	}
}

function replacer(details) {
	var _t = details.url, _img = false;
	_t = _t.substr(_t.lastIndexOf("/") + 1);
	if (cairImages[_t]) {
		_img = cairHost + _t;
	}
	if (!_img) {
		console.log(details.url);
		return {
			redirectUrl : details.url
		};
	} else {
		return {
			redirectUrl : _img
		};
	}
}

startup();
