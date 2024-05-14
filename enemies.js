class Enemy extends Entity {
    constructor () {
        super();
        


        // Valores no jogo
        this.valueHP = 0;
        this.valueCoins = 0;
        this.valueExp = 0;
        this.valueAtk = 0;
        this.level = 1;
    };
}

class EnemyEasy extends Enemy {
    constructor() {
        this.valueHP = 10 * this.level;
        this.valueCoins = 1 * this.level;
        this.valueExp = 5 * this.level;
        this.valueAtk = 5 * this.level;
    }

}

class EnemyMedium extends Enemy {
    constructor() {
        this.valueHP = 25 * this.level;
        this.valueCoins = 2 * this.level;
        this.valueExp = 10 * this.level;
        this.valueAtk = 15 * this.level;
    }
}

class EnemyHard extends Enemy {
    constructor() {
        this.valueHP = 50 * this.level;
        this.valueCoins = 5 * this.level;
        this.valueExp = 20 * this.level;
        this.valueAtk = 25 * this.level;
    }
}