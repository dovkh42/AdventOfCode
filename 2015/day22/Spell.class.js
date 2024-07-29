class Spell {
    constructor(name, isEffect, effectTimer, actionFunction) {
        this.name = name;
        this.isEffect = isEffect;
        this.effectTimer = effectTimer;
        this.actionFunction = actionFunction;
    }

    cast(player, opponent) {
        this.actionFunction(player, opponent);
        if (this.isEffect) {
            --this.effectTimer;
        }
    }

    static deepCopy(spell) {
        return new Spell(spell.name, spell.isEffect, spell.effectTimer, spell.actionFunction)
    }
}

export default Spell;