class Sword extends Entity {
    constructor(spriteSheet, x, y) {
        super();
        this.states = {
            ACTIVE: 'ACTIVE'
        };

        this.spriteSheet = spriteSheet;
        this.x = x;
        this.y = y;
        this.currentState = this.states.ACTIVE;
        this.currentFrame = 0;
        this.vx = 10;
        this.vy = 0.05;
        this.setup();
  }
  
    update() {
        this.currentFrame = (++this.currentFrame) % this.frames.length;
        this.width = this.frames[this.currentFrame].width;
        this.height = this.frames[this.currentFrame].height;
    
        this.x -= this.vx;
        this.y += this.vy;
        this.vy += 0.01;
    }
  
    getSprite() {
        return this.frames[this.currentFrame];
    }
  
    setup() {
        this.eStates.ACTIVE = this.spriteSheet.getStats('SWORD');
        this.frames = this.eStates[this.currentState];
        this.width = this.frames[0].width;
        this.height = this.frames[0].height; 
    }
}
