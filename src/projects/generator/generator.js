var game = new Phaser.Game(500, 500, Phaser.AUTO, 'game', { create: create, update: update });

var graphics, scale, nodes, loop, currentNode, outerColor, innerColor;
function create() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	graphics = game.add.graphics(0, 0);
	nodes = []
	outerColor = 0x000000;
	innerColor = 0xFFFFFF;
	game.stage.backgroundColor = outerColor;
	game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(generate);
}

function update() {
	graphics.clear();
	graphics.beginFill(innerColor);
	for (var i = 0; i < nodes.length; i++) {
		graphics.drawRect(nodes[i].x*scale + 250, nodes[i].y*scale + 250, scale, scale);
	};
}

function newColors() {
	outerColor = randomColor();
	innerColor = randomColor();
	game.stage.backgroundColor = outerColor;
}

function generate() {
	game.time.events.remove(loop);
	var size = document.getElementById('size').value;
	scale = Math.max(2, 47 - 10*Math.log(10*Math.log(size)));
	nodes = [];
	currentNode = { x: 0, y: 0 };
	loop = game.time.events.repeat(1, size, step);
}

function step() {
	var newNode = {
		x: currentNode.x,
		y: currentNode.y
	};
	var direction = Math.floor(Math.random() * 4);
	while (exists(newNode.x, newNode.y)) {
		if (direction == 0) {
			newNode.x++;
		} else if (direction == 1) {
			newNode.y++;
		} else if (direction == 2) {
			newNode.x--;
		} else {
			newNode.y--;
		}
	}
	nodes.push(newNode);
	currentNode = newNode;
}

function exists(x, y) {
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].x == x && nodes[i].y == y)
			return true;
	}
	return false;
}

function randomColor() {
	var r1 = Math.floor(Math.random() * 0x10) * 0x10 * 0x10 * 0x10 * 0x10 * 0x10;
	var r2 = Math.floor(Math.random() * 0x10) * 0x10 * 0x10 * 0x10 * 0x10;
	var g1 = Math.floor(Math.random() * 0x10) * 0x10 * 0x10 * 0x10;
	var g2 = Math.floor(Math.random() * 0x10) * 0x10 * 0x10;
	var b1 = Math.floor(Math.random() * 0x10) * 0x10;
	var b2 = Math.floor(Math.random() * 0x10);
	return r1 + r2 + g1 + g2 + b1 + b2;
}