const access = require('./access.js');

const rollButton = document.getElementById();
const singleRollButton = document.getElementById();
const opDisplay = document.getElementById();

const baseRarities = [
    {
        name: "3",
        weight: 40
    },
    {
        name: "4",
        weight: 50
    },
    {
        name: "5",
        weight: 8
    },
    {
        name: "6",
        weight: 2
    }
];

let rarities = JSON.parse(JSON.stringify(baseRarities));
let rollCount = 0;
let result = [];

const pityCalculator = (raritiesList, rollsPastFifty) => {  
    const sixStar = raritiesList.find(r => r.name === "6");
    const originalSixStarWeight = sixStar.weight;
    sixStar.weight = Math.min(originalSixStarWeight + rollsPastFifty * 2, 100);

    const totalOtherWeight = 100 - originalSixStarWeight;
    const newTotalOtherWeight = 100 - sixStar.weight;
    const scaleFactor = newTotalOtherWeight / totalOtherWeight;

    raritiesList.forEach(rarity => {
        if(rarity.name !== "6") {
            rarity.weight = +(rarity.weight * scaleFactor).toFixed(4);
        }
    });
    
    const totalAdjusted = raritiesList.reduce((sum, r) => sum + r.weight, 0);
    const roundingError = 100 - totalAdjusted;
    sixStar.weight += roundingError;

    return raritiesList;
}

rollButton.addEventListener("click", () => {
    rollButton.disabled = true;
    for(let i = 0; i < 10; i++) {
        rollCount += 1;

        if(rollCount > 50) {
            rarities = pityCalculator(rarities, rollCount - 50);
        }
        
        result += access.browse(ops, Number(access.gacha(rarities)));
        if(result[i].rarity === "6") {
            rollCount = 0;
            rarities = JSON.parse(JSON.stringify(baseRarities));
        }

        if(opDisplay.innerHTML.length > 0) {
            opDisplay.innerHTML = "";
        }
        opDisplay.innerHTML += `<div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
        ">
<<<<<<< HEAD
            <p>${result[i].name}</p>
            <img src="${result[i].img}" alt="${result[i].name}">
=======
            <p>${op.name}</p>
            <img src="${op.img}" alt="${op.name}">
>>>>>>> 7dfbfecd6199522108a99f07ac7cbd8d60cac4c1
        </div>`
    }
    result = []
    rollButton.disabled = false;
});

singleRollButton.addEventListener("click", () => {
<<<<<<< HEAD
    rollButton.disabled = true;
    rollCount += 1;

    if(rollCount > 50) {
        rarities = pityCalculator(rarities, rollCount - 50);
    }
    
    result += access.browse(ops, Number(access.gacha(rarities)));
    if(result[0].rarity === "6") {
        rollCount = 0;
        rarities = JSON.parse(JSON.stringify(baseRarities));
    }

    if(opDisplay.innerHTML.length > 0) {
        opDisplay.innerHTML = "";
    }
    opDisplay.innerHTML += `<div style="
        display: flex;
        flex-direction: column;
        justify-content: center;
    ">
        <p>${result[0].name}</p>
        <img src="${result[0].img}" alt="${result[0].name}">
    </div>`
    result = []
    rollButton.disabled = false;
});
=======
    displayOp(roll(1));
});
>>>>>>> 7dfbfecd6199522108a99f07ac7cbd8d60cac4c1
