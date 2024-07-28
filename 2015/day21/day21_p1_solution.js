import fs from 'fs';
const filePath = './day21_input.txt';
const filePath2 = './day21_game_store_data.txt';

const data = fs.readFileSync(filePath, 'utf8');
const storeData = fs.readFileSync(filePath2, 'utf8');

const lines = data.split('\r\n');
lines[0] = lines[0].replace('Hit Points', 'HP')
const player = {
    HP: 100,
    Damage: 0, 
    Armor: 0
};
const boss = {};

lines.map((line) => {
    const [attribute, stat] = line.split(':');
    boss[attribute] = parseInt(stat);
})

const store = {};
const categories = storeData.split('\r\n\r\n')
for (let category of categories) {
    const items = category.split('\r\n')
    const [categoryName, ..._attributeNames] = items.shift().trim().split(':');
    store[categoryName] = new Map();
    for (let item of items) {
        let [type, ...attributes] = item.trim().split(/\s+/);
        const [Cost, Damage, Armor] = attributes.map(Number);
        store[categoryName].set(type, { Cost, Damage, Armor });
    }
}

const isPlayerWinner = (player, boss) => {
    let playersTurn = true;
    while (boss.HP > 0 && player.HP > 0) {
        if (playersTurn) {
            boss.HP -= Math.max(player.Damage - boss.Armor, 1);
        } else {
            player.HP -= Math.max(boss.Damage - player.Armor, 1);
        }
        playersTurn = !playersTurn;
    }

    return player.HP > 0
}


let minCost = Infinity;
for (let [_weapon, weaponStats] of store.Weapons) {
    for (let [_armor, armorStats] of store.Armor) {
        for (let [_ring1, ringStats1] of store.Rings) {
            for (let [_ring2, ringStats2] of store.Rings) {
                let playerStats = {
                    HP: player.HP,
                    Damage: player.Damage + weaponStats.Damage + ringStats1.Damage + ringStats2.Damage,
                    Armor: player.Armor + armorStats.Armor + ringStats1.Armor + ringStats2.Armor
                }
                let bossStats = {
                    HP: boss.HP,
                    Damage: boss.Damage,
                    Armor: boss.Armor
                }
                let cost = weaponStats.Cost + armorStats.Cost + ringStats1.Cost + ringStats2.Cost;
                const isWinner = isPlayerWinner(playerStats, bossStats);
                if (isWinner && (cost < minCost)) {
                    //console.log(cost)
                    //console.log(_weapon, _armor, _ring1, _ring2)
                    minCost = cost;
                }
            }
        }
    }
}

console.log(`Answer is: ${minCost}`);