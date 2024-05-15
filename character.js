class Character extends Entity {
    constructor (spriteSheet, x, y, canvasWidth, canvasHeight) {
        super();
        this.states = {
            MOVE: 'MOVE',
            SHOOT: 'SHOOT',
            STOPPED: 'STOPPED',
            HIT: 'HIT'
        };
      
        this.direction = {
            LEFT: 'LEFT',
            RIGHT: 'RIGHT',
            UP: 'UP',
            DOWN: 'DOWN'
        }

        this.spriteSheet = spriteSheet;
        this.x = x;
        this.y = y;
        this.currentState = this.states.STOPPED;
        this.currentFrame = 0;
        this.vx = 20;
        this.vy = 20;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.valueHP = 100;
        this.valueCoins = 0;
        this.valueExp = 0;
        this.valueAtk = 5;
        this.valueDef = 5;
        this.level = 1;

        this.setup();
    }

    update() {
        this.currentFrame = (++this.currentFrame) % this.frames.length;
      this.width = this.frames[this.currentFrame].width;
      this.height = this.frames[this.currentFrame].height;
    }
    
    getSprite() {
        return this.frames[this.currentFrame];
    }

    setup() {
        this.eStates.MOVE = this.spriteSheet.getStats('WALK');
        this.eStates.SHOOT = this.spriteSheet.getStats('ATTACK');
        this.eStates.STOPPED = this.spriteSheet.getStats('IDLE');
        //this.eStates.HIT = this.spriteSheet.getStats('ATINGIDO');
  
      this.frames = this.eStates[this.currentState];
      this.width = this.frames[0].width;
      this.height = this.frames[0].height;
    }

    move(direction) {
        this.toggleState(this.states.MOVE);
        
        switch (direction) {
          case this.direction.LEFT:
            this.x -= this.x - this.vx >= 0 ? this.vx : 0;
            break;
          case this.direction.RIGHT:
            this.x += this.x + this.vx <= this.canvasWidth - this.width ? this.vx : 0;
            break;
          case this.direction.UP:
            this.y -= this.y - this.vy >= 0 ? this.vy : 0;
            break;
          case this.direction.DOWN:
            this.y += this.y + this.vy <= this.canvasHeight - this.height ? this.vy : 0;
            break;
        }
    }
      
    stop() {
        this.toggleState(this.states.STOPPED);
    }

    shoot() {
        this.toggleState(this.states.SHOOT);
    }

    toggleState(newState) {
        if (this.currentState === newState)
          return;
        this.currentState = newState;
        this.frames = this.eStates[this.currentState];
        this.currentFrame = 0;
    } 

    // Subir o nivel
    levelUp() {
        expRequiredLevelUp = 100 * 1.5 ** (this.level - 1);
        if (this.valueExp >= expRequiredLevelUp) {
            this.valueHP += 10;
            this.valueAtk += 2;
            this.valueDef += 2;
            this.valueExp = 0;
            this.level++;
        }
    }

    // Perder HP no contacto com inimigos
    loseHP(enemyAtk) {
        valueToLose = enemyAtk - this.valueDef;
        this.valueHP -= valueToLose;
    }

    // Perder coins após compra no vendedor
    loseCoins(amountCoins) {
        this.valueCoins -= amountCoins;
    }

    // Comprar +10 HP no vendedor
    gainHP() {
        this.valueHP += 10;
    }

    // Comprar +5 Atk no vendedor
    gainAtk() {
        this.valueAtk += 5;
    }

    // Comprar +5 Def no vendedor
    gainDef() {
        this.valueDef += 5;
    }

    // Comprar +1000 Exp no vendedor
    gainExp() {
        this.valueExp += 1000;
    }
}