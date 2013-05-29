var cairImg, cairHost, cairImages;

function startup() {
	cairHost = localStorage["cairImageHost"];
	cairImages = localStorage["cairImages"];
	if (cairHost && cairImages) {
		cairImg = {};
		var _images = cairImages.split(',');
		for ( var i = 0, j = _images.length; i < j; i++) {
			cairImg[_images[i].trim()] = true;
		}
		_images = null;
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
	if (cairImg[_t]) {
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
