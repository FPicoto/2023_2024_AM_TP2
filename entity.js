class Entity {
    constructor() {
      this.sprite = {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 64,
        sourceHeight: 64
      };
      this.eStates = {};
  
      this.x = 0;
      this.y = 0;
      this.width = 64;
      this.height = 64;
  
      this.vx = 3;
      this.vy = 3;
    }
  
    update() { };
    
    getLeftCoord() { 
        return this.x; 
    }

    getRightCoord() { 
        return this.x + this.width; 
    }

    getTopCoord() { 
        return this.y; 
    }

    getBottomCoord() { 
        return this.y+ this.height; 
    }

    loadImage(loadHandler) {
        this.sprite.img = new Image();
        this.sprite.img.addEventListener("load", loadHandler);
        this.sprite.img.src = this.sprite.imgURL;
    }

    update (canvasWidth, canvasHeight) {
        // The update is empty by default.
    }
  }
  