const access = require('./access.js');

const rollButton = document.getElementById();
const singleRollButton = document.getElementById();
const bannerList = document.querySelectorAll("input[type='radio'][name='btn_banner']");
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

const tenthRoll = [
    {
        name: "5",
        weight: 98
    },
    {
        name: "6",
        weight: 2
    }
]

let rarities = JSON.parse(JSON.stringify(baseRarities));
let rollCount = 0;
let totalRollsCount = 0;
let hardpity;
let currentBanner;
let result = [];

bannerList.forEach((banner) => {
    banner.addEventListener("change", event => {
        currentBanner = access.jsonLoader(`banners/info/${event.target.value}.json`);
    });
});

const pityCalculator = (raritiesList, rollsPastFifty) => {  
    const sixStar = raritiesList.find(r => r.name === "6");
    const originalSixStarWeight = sixStar.weight;
    sixStar.weight = Math.min(originalSixStarWeight + rollsPastFifty * 2, 100);

    const totalOtherWeight = 100 - originalSixStarWeight;
    const newTotalOtherWeight = 100 - sixStar.weight;
    const scaleFactor = newTotalOtherWeight / totalOtherWeight;

    raritiesList.forEach(rarity => {
        if(rarity.name !== "6") {
            rarity.weight =+ (rarity.weight * scaleFactor).toFixed(4);
        }
    });
    
    const totalAdjusted = raritiesList.reduce((sum, r) => sum + r.weight, 0);
    const roundingError = 100 - totalAdjusted;
    sixStar.weight += roundingError;

    return raritiesList;
}

rollButton.addEventListener("click", () => {
    rollButton.disabled = true;
    if(opDisplay.innerHTML.length > 0) {
        opDisplay.innerHTML = "";
    }

    if(currentBanner.type === "Limited") {
        hardpity = 300;
    }
    else if(currentBanner.type === "TrueLimited") {
        hardpity = 120;
    }

    const hard6RateUp = currentBanner["hard6*RateUp"].length;
    const soft6RateUp = currentBanner["soft6*RateUp"].length;
    const fiveRateUp = currentBanner["5*RateUp"].length;

    for(let i = 0; i < 10; i++) {
        rollCount++;
        totalRollsCount++;

        if(rollCount > 50) {
            rarities = pityCalculator(rarities, rollCount - 50);
        }

        if(totalRollsCount === 10) {
            rarity = access.gacha(tenthRoll);
        }
        else {
            rarity = access.gacha(rarities);
        }

        const isRateUp = access.RNG(1);

        if(currentBanner.type === "Limited" && rarity === "6") {
            rollCount = 0;
            rarities = JSON.parse(JSON.stringify(baseRarities));

            if(isRateUp === 1) {
                const isHardRateUp = access.RNG(1);
                if(isHardRateUp === 1) {
                    result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]);
                }
                else {
                    result.push(currentBanner["soft6*RateUp"][access.RNG(soft6RateUp)]);
                }
                continue;
            }
        }
        else if(["TrueLimited", "Limited"].includes(currentBanner.type) && totalRollsCount === hardpity) {
            result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]);
            continue;
        }
        
        if(rarity === "6") {
            rollCount = 0;
            rarities = JSON.parse(JSON.stringify(baseRarities));

            if(isRateUp === 1) {
                result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]);
                continue;
            }
        }
        else if(rarity === "5" && isRateUp === 1) {
            result.push(currentBanner["5*RateUp"][access.RNG(fiveRateUp)]);
            continue;
        }
        result.push(currentBanner["stdRoster"][`${rarity}*`][access.RNG(currentBanner["stdRoster"][`${rarity}*`].length)]);
    }

    result.forEach(ops => {
        opDisplay.innerHTML += `<div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
">
    <img src="${ops.image}" alt="${ops.name}">
    <p>${ops.name}</p>
</div>`
    });
    result = [];
    rollButton.disabled = false;
});

singleRollButton.addEventListener("click", () => {
    singleRollButton.disabled = true;
    if(opDisplay.innerHTML.length > 0) {
        opDisplay.innerHTML = "";
    }

    if(currentBanner.type === "Limited") {
        hardpity = 300;
    }
    else if(currentBanner.type === "TrueLimited") {
        hardpity = 120;
    }

    const hard6RateUp = currentBanner["hard6*RateUp"].length;
    const soft6RateUp = currentBanner["soft6*RateUp"].length;
    const fiveRateUp = currentBanner["5*RateUp"].length;

    for(let i = 0; i < 1; i++) {
        rollCount++;
        totalRollsCount++;

        if(rollCount > 50) {
            rarities = pityCalculator(rarities, rollCount - 50);
        }

        if(totalRollsCount === 10) {
            rarity = access.gacha(tenthRoll);
        }
        else {
            rarity = access.gacha(rarities);
        }

        const isRateUp = access.RNG(1);

        if(currentBanner.type === "Limited" && rarity === "6") {
            rollCount = 0;
            rarities = JSON.parse(JSON.stringify(baseRarities));

            if(isRateUp === 1) {
                const isHardRateUp = access.RNG(1);
                if(isHardRateUp === 1) {
                    result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]);
                }
                else {
                    result.push(currentBanner["soft6*RateUp"][access.RNG(soft6RateUp)]);
                }
                continue;
            }
        }
        else if(["TrueLimited", "Limited"].includes(currentBanner.type) && totalRollsCount === hardpity) {
            result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]);
            continue;
        }
        
        if(rarity === "6") {
            rollCount = 0;
            rarities = JSON.parse(JSON.stringify(baseRarities));

            if(isRateUp === 1) {
                result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]);
                continue;
            }
        }
        else if(rarity === "5" && isRateUp === 1) {
            result.push(currentBanner["5*RateUp"][access.RNG(fiveRateUp)]);
            continue;
        }
        result.push(currentBanner["stdRoster"][`${rarity}*`][access.RNG(currentBanner["stdRoster"][`${rarity}*`].length)]);
    }

    result.forEach(ops => {
        opDisplay.innerHTML += `<div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
">
    <img src="${ops.image}" alt="${ops.name}">
    <p>${ops.name}</p>
</div>`
    });
    result = []
    singleRollButton.disabled = false;
});