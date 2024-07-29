import fs from 'fs';

import Character from './Character.class.js'
import SpellFactory from './SpellFactory.class.js'
import Wizard from './Wizard.class.js'

const filePath = './day22_input.txt';

const data = fs.readFileSync(filePath, 'utf8');

const lines = data.split('\r\n');
lines[0] = lines[0].replace('Hit Points', 'HP')

const getMinSpentMana = () => {
    const boss = new Character(Number.parseInt((lines[0].split(' '))[1]), 0, Number.parseInt((lines[1].split(' '))[1]));
    const player = new Wizard(500, 50, 0, 0);
    let minSpentMana = Infinity;

    const play = (player, boss) => {
        for (const spellName of SpellFactory.getSpellList()) {
            if (player.getMana() < SpellFactory.getCost(spellName)) {
                continue;
            }

            const dupPlayer = Wizard.deepCopy(player);
            const dupBoss = Character.deepCopy(boss);
            --dupPlayer.hp;

            dupPlayer.runEffects(dupBoss);

            if (dupPlayer.hasSpell(spellName)) {
                continue;
            }

            const newSpell = dupPlayer.buySpell(spellName);
            dupPlayer.attack(dupBoss, newSpell);

            dupPlayer.runEffects(dupBoss);

            if (dupBoss.getHp() > 0) {
                dupBoss.attack(dupPlayer);
            }

            if (dupBoss.getHp() <= 0 && dupPlayer.getHp() > 0) {
                if (minSpentMana > dupPlayer.getSpentMana()) {
                    minSpentMana = dupPlayer.getSpentMana();
                }
            }

            if (dupPlayer.getHp() > 0 && dupBoss.getHp() > 0 && player.getSpentMana() < minSpentMana) {
                play(dupPlayer, dupBoss)
            }
        }
    }

    play(player, boss);

    return minSpentMana;
}

console.log(`Answer is: ${getMinSpentMana()}`);