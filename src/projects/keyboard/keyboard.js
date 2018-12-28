$(document).ready(function() {
	var keys = [
		{
			letter: 'q',
			displayLetter: 'q',
			x: 1,
			y: 2
		}, {
			letter: 'w',
			displayLetter: 'w',
			x: 10,
			y: 2
		}, {
			letter: 'e',
			displayLetter: 'e',
			x: 19,
			y: 2
		}, {
			letter: 'r',
			displayLetter: 'r',
			x: 28,
			y: 2
		}, {
			letter: 't',
			displayLetter: 't',
			x: 37,
			y: 2
		}, {
			letter: 'y',
			displayLetter: 'y',
			x: 46,
			y: 2
		}, {
			letter: 'u',
			displayLetter: 'u',
			x: 55,
			y: 2
		}, {
			letter: 'i',
			displayLetter: 'i',
			x: 64,
			y: 2
		}, {
			letter: 'o',
			displayLetter: 'o',
			x: 73,
			y: 2
		}, {
			letter: 'p',
			displayLetter: 'p',
			x: 82,
			y: 2
		}, {
			letter: 'a',
			displayLetter: 'a',
			x: 4,
			y: 20
		}, {
			letter: 's',
			displayLetter: 's',
			x: 13,
			y: 20
		}, {
			letter: 'd',
			displayLetter: 'd',
			x: 22,
			y: 20
		}, {
			letter: 'f',
			displayLetter: 'f',
			x: 31,
			y: 20
		}, {
			letter: 'g',
			displayLetter: 'g',
			x: 40,
			y: 20
		}, {
			letter: 'h',
			displayLetter: 'h',
			x: 49,
			y: 20
		}, {
			letter: 'j',
			displayLetter: 'j',
			x: 58,
			y: 20
		}, {
			letter: 'k',
			displayLetter: 'k',
			x: 67,
			y: 20
		}, {
			letter: 'l',
			displayLetter: 'l',
			x: 76,
			y: 20
		}, {
			letter: 'z',
			displayLetter: 'z',
			x: 9,
			y: 38
		}, {
			letter: 'x',
			displayLetter: 'x',
			x: 18,
			y: 38
		}, {
			letter: 'c',
			displayLetter: 'c',
			x: 27,
			y: 38
		}, {
			letter: 'v',
			displayLetter: 'v',
			x: 36,
			y: 38
		}, {
			letter: 'b',
			displayLetter: 'b',
			x: 45,
			y: 38
		}, {
			letter: 'n',
			displayLetter: 'n',
			x: 54,
			y: 38
		}, {
			letter: 'm',
			displayLetter: 'm',
			x: 63,
			y: 38
		}
	];

	updateCSS();
	var started = false;

	function getKey(letter) {
		for (var i = 0; i < keys.length; i++) {
			if (keys[i].letter == letter)
				return keys[i];
		}
	}

	function updateCSS() {
		for (var i = 0; i < keys.length; i++) {
			$('#keyboard .' + keys[i].displayLetter).css('left', keys[i].x + '%');
			$('#keyboard .' + keys[i].displayLetter).css('top', keys[i].y + '%');
		}
	}

	function scramble() {
		var keysCopy = keys.slice(0);
		for (var i = 0; i < keys.length; i++) {
			keys[i].displayLetter = keysCopy.splice(Math.floor(Math.random() * keysCopy.length), 1)[0].letter;
		}
		updateCSS();
	}

	$(document).keydown(function(e) {
		var key = String.fromCharCode(e.which).toLowerCase();
		if (getKey(key)) {
			$('#keyboard .' + getKey(key).displayLetter).addClass('pressed');
			if (!started) {
				$('#words').html('&nbsp;');
				$('#words').css('text-align', 'left');
				started = true;
			}
			$('#words').html($('#words').html() + getKey(key).displayLetter);
			if ($('#words').html().length > 30) {
				$('#words').html($('#words').html().slice($('#words').html().lastIndexOf(' ') + 1, $('#words').html().length));
				if ($('#words').html().length > 30) {
					$('#words').html('&nbsp;');
				}
			}
		} else if (e.which == 32) {
			$('#keyboard span').removeClass('pressed');
			$('#keyboard .space').addClass('pressed');
			$('#words').html($('#words').html() + ' ');
			scramble();
			e.preventDefault();
		} else if (e.which == 8) {
			$('#words').html($('#words').html().slice(0, $('#words').html().length - 1))
			if ($('#words').html().length == 0) $('#words').html('&nbsp;');
			e.preventDefault();
		}
	});

	$(document).keyup(function(e) {
		var key = String.fromCharCode(e.which).toLowerCase();
		if (getKey(key)) {
			$('#keyboard .' + getKey(key).displayLetter).removeClass('pressed');
		} else if (e.which == 32) {
			$('#keyboard .space').removeClass('pressed');
		}
	});
});