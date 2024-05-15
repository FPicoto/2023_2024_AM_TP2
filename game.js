let canvasFP;
let drawingSurface;
let spriteSheetPlayer;
let entities = [];
let activeKeys = new Array(255);
let player = undefined;
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
	canvasFP = document.querySelector("#canvasFP");
	canvasFP.width = 550;
	canvasFP.height = 400;
	drawingSurface = canvasFP.getContext("2d");

	gameWorld = new Entity();
	gameWorld.width = canvasFP.width;
	gameWorld.height = canvasFP.height;
	gameWorld.x = 0;
	gameWorld.y = 0;

	camera = new Camera(0, gameWorld.height / 2, 
		Math.floor(gameWorld.width), gameWorld.height / 2);

	spriteSheetPlayer = new SpriteSheet("assets/images/character.png", 
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

		/*player = new player(spriteSheetplayer, canvasFP.width * 0.5 - 36, 
			canvasFP.height - 120, canvasFP.width, canvasFP.height);*/
		player = new Player(spriteSheetplayer, 0, 
				0, canvasFP.width, canvasFP.height);
		entities.push(player);
	
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
       player.move(player.direction.LEFT);
   if (activeKeys[keyboard.RIGHT])
       player.move(player.direction.RIGHT);

   if (activeKeys[keyboard.SPACE]) 
   {
       activeKeys[keyboard.SPACE] = false;
       player.stop();

       /*let fire = new Fire(spriteSheetTank, tank.x - 10,
           tank.y + tank.height * 0.5 - 10);
       entities.push(fire);

       let bullet = new Bullet(spriteSheetTank,
           tank.x, tank.y + tank.height * 0.5);
       entities.push(bullet);*/
   }
 
   for (let i = 0; i < entities.length; i++)
       entities[i].update();

   /*if(activeKeys[keyboard.LEFT] && background.x >= 0)
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

   if(player.x < camera.leftInnerBoundary()) {
       player.x = camera.leftInnerBoundary();
       // TODO: A velocidade do background no eixo do x assume 
           // a velocidade do tanque.
       background.vx = player.vx;
   }

   if(player.x + player.width > camera.rightInnerBoundary()) {
       player.x = camera.rightInnerBoundary() - player.width;
       // TODO: A velocidade do background no eixo do x assume 
           // a velocidade do tanque no sentido oposto.
       background.vx = -player.vx;
   }*/
   
   requestAnimationFrame(update);
   render();
}

function render() {   
	drawingSurface.clearRect(0, 0, canvasFP.width, canvasFP.height);
  
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