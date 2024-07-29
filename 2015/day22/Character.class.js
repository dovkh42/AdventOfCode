class Character {
    constructor(hp, armor, damage) {
        this.hp = hp;
        this.armor = armor;
        this.damage = damage;
    }

    attack(victim) {
        const damage = Math.max(this.damage - victim.armor, 1);
        victim.hp -= damage;
    }

    getHp() {
        return this.hp
    }

    static deepCopy(character) {
        return new Character(character.hp, character.armor, character.damage);
    }
}

export default Character;