console.log('cair');

var _active = false;

function newpage(_evt) {
	if(_active == false && $('div.cairReworked').length == 0) {
		_active = true;
		$('table.layout').append('<div class="cairReworked">');
		var _replace = {};
		console.log('start cair');
		$('img').each(function(_i, _e) {
			var _img = /\w*.\w{3}$/.exec($(_e).attr('src'))[0].toString();
			if(cairImg[_img] == true) {
				$(_e).attr('src', chrome.extension.getURL('img/' + _img.slice(0, 1) + '/' + _img));
			}
		});
		console.log('end cair');
		window.setTimeout(function() {
			_active = false
		}, 1000);
	}
}


$('style[type="text/css"]').each(function(_i, _e) {
	var _css = $(_e).html();
	var _match = _css.match(/http:\/\/image4.castleagegame.com\/.*graphics.*\/\w*.\w{3}/g);
	if(_match !== null) {
		$.each(_match, function(_i, _e2) {
			var _img = /\w*.\w{3}$/.exec(_e2)[0].toString();
			if(cairImg[_img] == true) {
				_css = _css.replace(_e2, chrome.extension.getURL('img/' + _img.slice(0, 1) + '/' + _img));
			}
		});
		$(_e).html(_css);
	}
});
$('table.layout').live('DOMSubtreeModified', newpage);
