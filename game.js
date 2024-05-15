let canvas;
let drawingSurface;
let spriteSheetCharacter;
let entities = [];
let activeKeys = new Array(255);
let character = undefined;
let camera = undefined;
let gameWorld = undefined;
let background = undefined;
let assetsLoaded = 0;

let keyboard = {
	SPACE: 32,
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40
}

window.addEventListener("load", init, false);

function init() {
	canvas = document.querySelector("canvas");
	canvas.width = 550;
	canvas.height = 400;
	drawingSurface = canvas.getContext("2d");

	gameWorld = new Entity();
	gameWorld.width = canvas.width;
	gameWorld.height = canvas.height;
	gameWorld.x = 0;
	gameWorld.y = 0;

	camera = new Camera(0, gameWorld.height / 2, 
		Math.floor(gameWorld.width), gameWorld.height / 2);

	spriteSheetCharacter = new SpriteSheet("assets/images/character.png", 
		"assets/images/character.json", spriteLoaded);
	/*spriteSheetBack = new SpriteSheet("assets/grass.png",
		"assets/grass.json", spriteLoaded);*/
}

function spriteLoaded() {
	assetsLoaded++;

	if (assetsLoaded == 2)
	{
		/*background = new Background(spriteSheetBack, -5000, 0);
		background.x = Math.floor((background.width / 3) * -2);
		entities.push(background);*/

		character = new Character(spriteSheetCharacter, canvas.width * 0.5 - 36, 
			canvas.height - 120, canvas.width, canvas.height);
		entities.push(character);
	
		update();
		window.addEventListener("keydown", keyDownHandler, false);
		window.addEventListener("keyup", keyUpHandler, false);		
	}
}

function keyDownHandler(e) {
	activeKeys[e.keyCode] = true;  
}

function keyUpHandler(e) {
	activeKeys[e.keyCode] = false;  
	tank.stop();
	// TODO: O background pára de se mover.
	background.stop();
}

function update() {
    if (activeKeys[keyboard.LEFT])
       character.move(character.direction.LEFT);
   if (activeKeys[keyboard.RIGHT])
       character.move(character.direction.RIGHT);

   if (activeKeys[keyboard.SPACE]) 
   {
       activeKeys[keyboard.SPACE] = false;
       character.stop();

       /*let fire = new Fire(spriteSheetTank, tank.x - 10,
           tank.y + tank.height * 0.5 - 10);
       entities.push(fire);

       let bullet = new Bullet(spriteSheetTank,
           tank.x, tank.y + tank.height * 0.5);
       entities.push(bullet);*/
   }
 
   for (let i = 0; i < entities.length; i++)
       entities[i].update();

   if(activeKeys[keyboard.LEFT] && background.x >= 0)
   {
       // TODO: A posição no eixo do x do background assume o valor inicial.
       background.x = Math.floor((background.width / 3) * -2);
   }
   else if(activeKeys[keyboard.RIGHT] 
       && background.x <= Math.floor((background.width / 3) * -2))
   {
       // TODO: A posição no eixo do x do background assume o valor de 0.
       background.x = 0;
   }

   if(character.x < camera.leftInnerBoundary()) {
       character.x = camera.leftInnerBoundary();
       // TODO: A velocidade do background no eixo do x assume 
           // a velocidade do tanque.
       background.vx = character.vx;
   }

   if(character.x + character.width > camera.rightInnerBoundary()) {
       character.x = camera.rightInnerBoundary() - character.width;
       // TODO: A velocidade do background no eixo do x assume 
           // a velocidade do tanque no sentido oposto.
       background.vx = -character.vx;
   }
   
   requestAnimationFrame(update);
   render();
}

function render() {   
	drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  	for (let i = 0; i < entities.length; i++)
	{ 
    	let entity = entities[i];
		let sprite = entity.getSprite();  
	 
    	if (!entity.killed)
		{
			drawingSurface.drawImage(
				entity.spriteSheet.img, 
				sprite.x, sprite.y, 
				sprite.width, sprite.height,
				entity.x, entity.y,  
				entity.width, entity.height
			);
  		}
  	}

	camera.drawFrame(drawingSurface, true);
}