class Character extends Entity {
    constructor () {
        this.valueHP = 100;
        this.valueCoins = 0;
        this.valueExp = 0;
        this.valueAtk = 5;
        this.valueDef = 5;
        this.level = 1;
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