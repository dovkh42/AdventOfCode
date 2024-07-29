import Spell from './Spell.class.js'

class SpellFactory {
    static #spellCost = {
        missile: 53,
        drain: 73,
        shield: 113,
        poison: 173,
        recharge: 229
    }

    static getCost(spellName) {
        return this.#spellCost[spellName];
    }

    static getSpellList() {
        return Object.keys(this.#spellCost);
    }

    static buySpell(spellName, budget) {
        if (!budget || typeof budget !== 'number' || budget < this.#spellCost[spellName]) {
            return undefined;
        }

        switch (spellName) {
            case 'missile':
                return new Spell(spellName, false, 0, (_player, opponent) => {
                    opponent.hp -= 4;
                });
            case 'drain':
                return new Spell(spellName, false, 0, (player, opponent) => {
                    opponent.hp -= 2;
                    player.hp += 2;
                });
            case 'shield':
                return new Spell(spellName, true, 6, (player, _opponent) => {
                    if (player.armor === 0) {
                        player.armor = 7;
                    }
                    if (player.activeSpells.find((spell) => spell.name === spellName).effectTimer === 1) {
                        player.armor = 0;
                    }
                });
            case 'poison':
                return new Spell(spellName, true, 6, (_player, opponent) => {
                    opponent.hp -= 3;
                });
            case 'recharge':
                return new Spell(spellName, true, 5, (player, _opponent) => {
                    player.mana += 101;
                });
            default:
                throw new Error(`Spell doesn't exist`);
        }
    }
}

export default SpellFactory;