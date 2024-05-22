let canvasFP;
let drawingSurface;
let entities = [];
let activeKeys = new Array(255);
let player = undefined;
let camera = undefined;
let gameWorld = undefined;
let background_1 = undefined;
let background_2 = undefined;
let background_3 = undefined;
let background_4 = undefined;
let background_5 = undefined;
let assetsLoaded = 0;
let fps = 10;
let lastKeyPressed = undefined;

let keyboard = {
	SPACE: 32,
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40
}

window.addEventListener("load", init, false);

function init() {
	canvasFP = document.querySelector("#canvasFP");
	canvasFP.width = 480;
	canvasFP.height = 270;
	drawingSurface = canvasFP.getContext("2d");

	gameWorld = new Entity();
	gameWorld.width = canvasFP.width;
	gameWorld.height = canvasFP.height;
	gameWorld.x = 0;
	gameWorld.y = 0;

	camera = new Camera(0, 0, Math.floor(gameWorld.width), gameWorld.height);
	camera.center(gameWorld);

	// Player
	spriteSheetPlayer = new SpriteSheet("assets/images/character.png", 
		"assets/images/character.json", spriteLoaded);

	// Background 1
	spriteSheetBack1 = new SpriteSheet("assets/images/background_1.png",
		"assets/images/background_1.json", spriteLoaded);

	// Background 2
	spriteSheetBack2 = new SpriteSheet("assets/images/background_2.png",
		"assets/images/background_2.json", spriteLoaded);

	// Background 3
	spriteSheetBack3 = new SpriteSheet("assets/images/background_3.png",
		"assets/images/background_3.json", spriteLoaded);

	// Background 4
	spriteSheetBack4 = new SpriteSheet("assets/images/background_4.png",
		"assets/images/background_4.json", spriteLoaded);

	// Background 5
	spriteSheetBack5 = new SpriteSheet("assets/images/background_5.png",
		"assets/images/background_5.json", spriteLoaded);

	window.addEventListener("keydown", keyDownHandler, false);
	window.addEventListener("keyup", keyUpHandler, false);		
}

function spriteLoaded() {
	assetsLoaded++;
	
	if (assetsLoaded > 0) {
		// Background 1
		background_1 = new Background(spriteSheetBack1, 0, 0);
		background_1.x = Math.floor(((background_1.width * 1.5) / 3) * - 2);
		entities.push(background_1);

		// Background 2
		background_2 = new Background(spriteSheetBack2, 0, 0);
		background_2.x = Math.floor(((background_2.width * 1.5) / 3) * - 2);
		entities.push(background_2);

		// Background 3
		background_3 = new Background(spriteSheetBack3, 0, 0);
		background_3.x = Math.floor(((background_3.width * 1.5) / 3) * - 2);
		entities.push(background_3);

		// Background 4
		background_4 = new Background(spriteSheetBack4, 0, 0);
		background_4.x = Math.floor(((background_4.width * 1.5) / 3) * - 2);
		entities.push(background_4);

		// Player
		player = new Player(spriteSheetPlayer, canvasFP.width / 2 - 96, 
			canvasFP.height / 2 - 24, canvasFP.width, canvasFP.height);
		entities.push(player);

		// Background 5
		background_5 = new Background(spriteSheetBack5, 0, 0);
		background_5.x = Math.floor(((background_5.width * 1.5) / 3) * - 2);
		entities.push(background_5);

		update();
	}
}

function keyDownHandler(e) {
	activeKeys[e.keyCode] = true;
}

function keyUpHandler(e) {
	if (e.keyCode != keyboard.SPACE) {
		activeKeys[e.keyCode] = false;
		player.stop();
		background_1.stop();
		background_2.stop();
		background_3.stop();
		background_4.stop();
		background_5.stop();
	}
		
}

function update() {
	if (activeKeys[keyboard.LEFT]) {
		player.move(player.direction.LEFT);
		player.flip = 1;
	}
		
   	if (activeKeys[keyboard.RIGHT]) {
    	player.move(player.direction.RIGHT);
		player.flip = 0;
	}
	
	if (activeKeys[keyboard.SPACE]) {
		window.removeEventListener("keydown", keyDownHandler, false) // Não deixar entrar mais inputs
		window.removeEventListener("keyup", keyUpHandler, false) // Não deixar entrar mais inputs
		for (i = 0; i < activeKeys.length; i++) {	// Deixar apenas o Space a true
			if (activeKeys[i] != keyboard.SPACE)
				activeKeys[i] = false;
		}
		player.attack();	// Fazer a animação de ataque
		setTimeout(() => {	// Interromper a animação infinita após 1 ciclo
			activeKeys[keyboard.SPACE] = false;
			player.stop();
			window.addEventListener("keydown", keyDownHandler, false);
			window.addEventListener("keyup", keyUpHandler, false);
		}, 1000 / fps * 7); // 7 é o numero de frames para atacar
	}
		
	for (let i = 0; i < entities.length; i++)
		entities[i].update();

	// Background 1 -> Mais longe
	// Background 5 -> Mais perto

	// Background 1
   	if (activeKeys[keyboard.LEFT] && background_1.x >= 0) {
		background_1.x = Math.floor(((background_1.width * 1.5) / 3) * -2);
	} else if (activeKeys[keyboard.RIGHT] && background_1.x <= Math.floor(((background_1.width * 1.5) / 3) * -2)) {
		background_1.x = 0;
	}

	// Background 2
	if (activeKeys[keyboard.LEFT] && background_2.x >= 0) {
		background_2.x = Math.floor(((background_2.width * 1.5) / 3) * -2);
	} else if (activeKeys[keyboard.RIGHT] && background_2.x <= Math.floor(((background_2.width * 1.5) / 3) * -2)) {
		background_2.x = 0;
	}

	// Background 3
	if (activeKeys[keyboard.LEFT] && background_3.x >= 0) {
		background_3.x = Math.floor(((background_3.width * 1.5) / 3) * -2);
	} else if (activeKeys[keyboard.RIGHT] && background_3.x <= Math.floor(((background_3.width * 1.5) / 3) * -2)) {
		background_3.x = 0;
	}

	// Background 4
	if (activeKeys[keyboard.LEFT] && background_4.x >= 0) {
		background_4.x = Math.floor(((background_4.width * 1.5) / 3) * -2);
	} else if (activeKeys[keyboard.RIGHT] && background_4.x <= Math.floor(((background_4.width * 1.5) / 3) * -2)) {
		background_4.x = 0;
	}

	// Background 5
	if (activeKeys[keyboard.LEFT] && background_5.x >= 0) {
		background_5.x = Math.floor(((background_5.width * 1.5) / 3) * -2);
	} else if (activeKeys[keyboard.RIGHT] && background_5.x <= Math.floor(((background_5.width * 1.5) / 3) * -2)) {
		background_5.x = 0;
	}

   if (player.x + 64 < camera.leftInnerBoundary()) {
		player.x = camera.leftInnerBoundary() - 64;

		background_1.vx = player.vx / 30;
		background_2.vx = player.vx / 20; 
		background_3.vx = player.vx / 10;
		background_4.vx = player.vx / 2;
		background_5.vx = player.vx;
   }

   	if (player.x + player.width + 32 > camera.rightInnerBoundary()) {
		player.x = camera.rightInnerBoundary() - player.width - 32;

    	background_1.vx = -player.vx / 30;
		background_2.vx = -player.vx / 20;
		background_3.vx = -player.vx / 10;
		background_4.vx = -player.vx / 2;
		background_5.vx = -player.vx;
   	}
   
	setTimeout(() => {
		requestAnimationFrame(update);
   	}, 1000 / fps);
	render();
}

function render() {   
	drawingSurface.clearRect(0, 0, canvasFP.width, canvasFP.height);

  	for (let i = 0; i < entities.length; i++) { 
    	let entity = entities[i];
		let sprite = entity.getSprite();
	 
    	if (!entity.killed) {
			if (Player.prototype.isPrototypeOf(entity)) {
				drawingSurface.drawImage(
					entity.spriteSheet.img, 
					sprite.x, sprite.y, 
					sprite.width, sprite.height,
					entity.x, entity.y,  
					entity.width*2, entity.height*2
				);
			}

			if (Background.prototype.isPrototypeOf(entity)) {
				drawingSurface.drawImage(
					entity.spriteSheet.img, 
					sprite.x, sprite.y, 
					sprite.width, sprite.height,
					entity.x, entity.y,  
					entity.width*1.5, entity.height*1.5
				);
			}
  		}
  	}

	//camera.drawFrame(drawingSurface, true);
}

// CONTROLO DE TEMPO PARA BAIXAR O REFRESH RATE DO RequestAnimationFrame()
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

// Para edição de imagens 
// https://pinetools.com (Espelho, juncao e transformar o background branco em transparente)
// https://www.remove.bg (Transformar o background branco em transparente)