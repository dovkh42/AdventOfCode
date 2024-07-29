import Character from './Character.class.js';
import Spell from './Spell.class.js'
import SpellFactory from './SpellFactory.class.js'


class Wizard extends Character {
    constructor(mana, hp, armor, damage) {
        super(hp, armor, damage);
        this.mana = mana;
        this.activeSpells = [];
        this.spentMana = 0;
    }

    #spendMana(spellCost) {
        this.mana -= spellCost;
        this.spentMana += spellCost;
    }

    buySpell(spellName) {
        const spell = SpellFactory.buySpell(spellName, this.mana);
        if (spell.isEffect) {
            this.activeSpells.push(spell);
        }
        this.#spendMana(SpellFactory.getCost(spellName));

        return spell;
    }

    attack(victim, spell) {
        if (!spell.isEffect) {
            spell.cast(this, victim);
        }
    }

    runEffects(victim) {
        for (const spell of this.activeSpells) {
            spell.cast(this, victim);
        }
        this.activeSpells = this.activeSpells.filter((spell) => spell.effectTimer > 0);
    }

    static deepCopy(wizard) {
        const newWizard = new Wizard(wizard.mana, wizard.hp, wizard.armor, wizard.damage);
        newWizard.spentMana = wizard.spentMana;
        newWizard.activeSpells = wizard.activeSpells.map((spell) => {
            return Spell.deepCopy(spell);
        });

        return newWizard;
    }

    getSpentMana() {
        return this.spentMana;
    }

    getMana() {
        return this.mana;
    }

    hasSpell(spellName) {
        return this.activeSpells.some((spell) => spell.name === spellName);
    }
}

export default Wizard;