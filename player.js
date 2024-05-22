class Player extends Entity {
    constructor (spriteSheet, x, y, canvasWidth, canvasHeight) {
        super();
        this.states = {
            MOVE_RIGHT: 'MOVE_RIGHT',
            ATTACK_RIGHT: 'ATTACK_RIGHT',
            STOPPED_RIGHT: 'STOPPED_RIGHT',
            HIT: 'HIT',
            MOVE_LEFT: 'MOVE_LEFT',
            ATTACK_LEFT: 'ATTACK_LEFT',
            STOPPED_LEFT: 'STOPPED_LEFT',
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
        this.currentState = this.states.STOPPED_RIGHT;
        this.currentFrame = 0;
        this.vx = 15;
        this.vy = 5;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.flip = 0;
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
        this.eStates.MOVE_RIGHT = this.spriteSheet.getStats('WALK_RIGHT');
        this.eStates.MOVE_LEFT = this.spriteSheet.getStats('WALK_LEFT');
        this.eStates.ATTACK_RIGHT = this.spriteSheet.getStats('ATTACK_RIGHT');
        this.eStates.ATTACK_LEFT = this.spriteSheet.getStats('ATTACK_LEFT');
        this.eStates.STOPPED_RIGHT = this.spriteSheet.getStats('IDLE_RIGHT');
        this.eStates.STOPPED_LEFT = this.spriteSheet.getStats('IDLE_LEFT');
        //this.eStates.HIT = this.spriteSheet.getStats('ATINGIDO');
  
        this.frames = this.eStates[this.currentState];
        this.width = this.frames[0].width;
        this.height = this.frames[0].height;
    }

    move(direction) {  
        switch (direction) {
          case this.direction.LEFT:
            this.toggleState(this.states.MOVE_LEFT);
            this.x -= this.x - this.vx >= 0 ? this.vx : 0;
            break;
          case this.direction.RIGHT:
            this.toggleState(this.states.MOVE_RIGHT);
            this.x += this.x + this.vx <= this.canvasWidth - this.width ? this.vx : 0;
            break;
        }
    }

    stop() {
        if (this.flip == 0)
            this.toggleState(this.states.STOPPED_RIGHT);
        if (this.flip == 1)
            this.toggleState(this.states.STOPPED_LEFT);
    }

    attack() {
        if (this.flip == 0)
            this.toggleState(this.states.ATTACK_RIGHT);
        if (this.flip == 1)
            this.toggleState(this.states.ATTACK_LEFT);
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