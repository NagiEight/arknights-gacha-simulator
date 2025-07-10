import * as access from "./access.js";

const rollButton = document.getElementById();
const singleRollButton = document.getElementById();
const opDisplay = document.getElementById();
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("textDislay");
const customRoll = document.getElementById();
const customRollCount = document.getElementById();

const searchTerm = document.getElementById();
const searchOp = document.getElementById();
const keywords = document.getElementById();
const searchButton = document.getElementById();


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
];

let history = {
    "banner1": { //just an example banner, will be remove later
        "10thRollPity": 0,
        "totalRollsCount": 0,
        "currentRollCount": 0,
        "ops": {
            "6*": [{"name": "op", "count": 0}],
            "5*": [],
            "4*": [],
            "3*": [],
        }
    }
};

const bannersList = [];
const bannersPathList = [];

const opsList = [];
const opsPathList = [];

let rarities = JSON.parse(JSON.stringify(baseRarities));
let rollCount = 0;
let totalRollsCount = 0;
let tenthRollPity = 1;
let customRollNumber = 1;
let result = [];
let hardpity;
let currentBanner;

access.jsonLoader("opData.json").then(data => {
    for(const opPath of data) {
        opsList.push(opPath.split("/")[3]);
        opsPathList.push(opPath);
    }
});

access.jsonLoader("bannerData.json").then(data => {
    for(const bannerPath of data) {
        bannersList.push(bannerPath.split("/")[3]);
        bannersPathList.push(bannerPath);
    }
});

rollButton.addEventListener("click", () => {
    roll(10);
});

singleRollButton.addEventListener("click", () => {
    roll(1);
});

customRoll.addEventListener("click", () => {
    roll(customRollNumber);
});

customRollCount.addEventListener("input", () => {
    customRollNumber = +customRollCount.value;
});

searchButton.addEventListener("click", () => {
    const serachStruct = {
        "bannerName": "",
        "keyWord": "and",
        "ops": []
    }

    const searchFor = searchTerm.textContent;

    let opArray = "";
    let temp = false;
    let temp2 = "";

    const toRM = [];
    for(let i; i < searchFor.length(); i++) {
        if(searchFor[i] !== "}" && 
        searchFor[i] !== " " && 
        (searchFor[i] + searchFor[i + 1] + searchFor[i + 2] === "o:{" || temp)) {
            opArray += searchFor[i];

            temp = true;
            temp2 += searchFor[i];
        }
        else if(searchFor[i] === "}") {
            opArray += " ";

            toRM.push(temp2);
            temp = "";
            temp = false;
        }
    }

    if(serachStruct.keyWord == "and") {
        access.jsonLoader();
    }
});

const pityCalculator = (baseRarities, rollCount) => {
    const adjustedRarities = JSON.parse(JSON.stringify(baseRarities));

    if(rollCount > 50) {
        const extraChance = (rollCount - 50) * 2;
        const new6StarWeight = adjustedRarities.find(rarity => rarity.name === "6").weight + extraChance;

        const weightToSubtract = new6StarWeight - adjustedRarities.find(rarity => rarity.name === "6").weight;

        const totalOtherWeight = adjustedRarities
        .filter(rarity => rarity.name !== "6")
        .reduce((sum, rarity) => sum + rarity.weight, 0);

        for(const rarity of adjustedRarities) {
            if(rarity.name !== "6") {
                const reduction = (rarity.weight / totalOtherWeight) * weightToSubtract;
                rarity.weight = Math.max(0, rarity.weight - reduction);
            }
        }

        const sixStar = adjustedRarities.find(rarity => rarity.name === "6");
        sixStar.weight = new6StarWeight;
    }

    return adjustedRarities;
};

const jsonReader = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            return JSON.parse(event.target.result);
        }
        catch(error) {
            console.error(error);
        }
    };

    reader.onerror = () => {
        console.log(new Error("Unknown reading error."))
    };

    reader.readAsText(file);
};

const roll = (count) => {
    rollButton.disabled = true;
    singleRollButton.disabled = true;
    customRoll.disabled = true;

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

    for(let i = 0; i < count; i++) {
        rollCount++;
        totalRollsCount++;
        let isRateUp = 0;

        if(rollCount > 50) {
            rarities = pityCalculator(rarities, rollCount - 50);
        }

        rarity = totalRollsCount === 10 && tenthRollPity ? access.gacha(tenthRoll) : access.gacha(rarities);
        isRateUp = currentBanner.name.contains("Joint") ? 1 : access.RNG(1);
        
        if(currentBanner.type === "Limited" && rarity === "6") {
            rollCount = 0;
            rarities = JSON.parse(JSON.stringify(baseRarities));

            if(isRateUp === 1) {
                const isHardRateUp = access.RNG(1);

                isHardRateUp === 1 ? 
                result.push(currentBanner["hard6*RateUp"][access.RNG(hard6RateUp)]) :
                result.push(currentBanner["soft6*RateUp"][access.RNG(soft6RateUp)]);
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
        if(rarity in ["6", "5"]) {
            tenthRollPity = 0;
        }

        result.push(currentBanner["stdRoster"][`${rarity}*`][access.RNG(currentBanner["stdRoster"][`${rarity}*`].length)]);
    }

    let info;
    result.forEach(ops => {
        access.jsonLoader("./opData.json").then(data => {
            const pathToOp = data.find(pathToOp => pathToOp.includes(ops));
            access.jsonLoader(pathToOp).then(opData => {
                info = opData;
            });
        });

        const display = document.createElement("div");
        display.style.display = "flex";
        display.style.flexDirection = "column";
        display.style.alignItems = "center";
        display.style.justifyContent = "center";

        const img = document.createElement("img");
        img.src = info.image;
        img.alt = info.name;

        const name = document.createElement("p");
        name.textContent = info.name;
        
        display.appendChild(img);
        display.appendChild(name);
        opDisplay.appendChild(display);
    });

    history[currentBanner.name]["10thRollPity"] = tenthRollPity;
    history[currentBanner.name].totalRollsCount = totalRollsCount;
    history[currentBanner.name].currentRollCount = rollCount;

    [...new Set(result)].forEach(op => {
        let pathToOp;
        access.jsonLoader("./opData.json").then(data => {
            pathToOp = data.find(pathToOp => pathToOp.includes(op));
        });

        const opRarity = pathToOp.split("/")[2];

        for(let i = 0; i < history[currentBanner.name].ops[`${opRarity}*`].length; i++) {
            if(history[currentBanner.name].ops[`${opRarity}*`][i].name === op) {
                history[currentBanner.name].ops[`${opRarity}*`][i].count += result.filter(ops => ops === op).length;
                break;
            }
            else if(i + 1 == history[currentBanner.name].ops[`${opRarity}*`].length) {
                history[currentBanner.name].ops[`${opRarity}*`]
                .push({"name": op, "count": result.filter(ops => ops === op).length});
            }
        }

        document.getElementById(`${op.split(" ").join("_")}_count`).textContent = `x${result.filter(ops => ops === op).length}`;
    });
    
    result = [];
    rollButton.disabled = false;
    singleRollButton.disabled = false;
    customRoll.disabled = false;
};