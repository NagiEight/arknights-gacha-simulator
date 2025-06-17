import * as access from "./access.js";

const rollButton = document.getElementById();
const singleRollButton = document.getElementById();
const bannerList = document.querySelectorAll("input[type=\"radio\"][name=\"btn_banner\"]");
const body = document.body;
const opDisplay = document.getElementById();
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("textDislay");
const exportData = document.getElementById();
const importData = document.getElementById();
const customRoll = document.getElementById();
const customRollCount = document.getElementById();
const historyDisplay = document.getElementById("character-gallery");

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
const opsList = [];

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
        opsList.push({"name": opPath.split("/")[3], "rarity": opPath.split("/")[2]});
    }
});

access.jsonLoader("bannerData.json").then(data => {
    for(const bannerPath of data) {
        bannersList.push(bannerPath.split("/")[3]);
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

exportData.addEventListener("click", () => {
    const dataString = JSON.stringify(history, null, 4);
    const Blob = new Blob([JSON.stringify({ dataString, "currentBanner": currentBanner.name })], { type: "application/json" });
    
    const temp = document.createElement("a");
    temp.href = URL.createObjectURL(Blob);
    temp.download = "pullHistory.json";
    temp.click();
        
    URL.revokeObjectURL(temp.href);
});

importData.addEventListener("change", (event) => {
    const file = event.target.files[0];
    let temp = jsonReader(file);

    if(((!file || file.type !== "application/json")) ||
    !checkHistoryIntegrity(temp[0]) ||
    Object.keys(temp[1])[0] !== "currentBanner" ||
    !(temp[1].currentBanner in bannersList)) {
        alert("Please drop a valid history file.");
        return;
    }
    else {
        history = temp[0];
        currentBanner = temp[1].currentBanner;
    }

    displayHistory().then(() => {
        console.log("Display successfully.")
    });
});

body.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();

    overlay.style.display = "flex";
    overlayText.textContent = "Drop file to load";
});

body.addEventListener("dragleave", () => {
    overlay.style.display = "none";
});

body.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    overlay.style.display = "none";
    
    const file = event.target.files[0];
    let temp = jsonReader(file);

    if(((!file || file.type !== "application/json")) ||
    !checkHistoryIntegrity(temp[0]) ||
    Object.keys(temp[1])[0] !== "currentBanner" ||
    !(temp[1].currentBanner in bannersList)) {
        alert("Please drop a valid history file.");
        return;
    }
    else {
        history = temp[0];
        currentBanner = temp[1].currentBanner;
    }

    displayHistory(history[0]);
});

bannerList.forEach((banner) => {
    banner.addEventListener("click", event => {
        access.jsonLoader(`./banners/info/${event.target.value}.json`).then(data => {
            currentBanner = data;
        }).catch(error => console.error(error));
    });
});

const displayHistory = (history) => {
    overlay.style.display = "flex";
    overlayText.textContent = "Loading... Please wait!";

    for(const banner in history) {
        const bannerDisplay = document.createElement("div");

        bannerDisplay.id = banner;
        historyDisplay.appendChild(bannerDisplay);

        for(const rarity in history[banner].ops) {
            for(const op of history[banner].ops[rarity]) {
                const opHistoryContainer = document.createElement("div");
                
                opHistoryContainer.className = "bg-gray-600 p-1 rounded-lg border border-gray-700 flex mb-4 w-64";
                bannerDisplay.appendChild(opHistoryContainer);

                const opPFPDisplay = document.createElement("img");

                opPFPDisplay.className = "w-auto h-12";
                opPFPDisplay.alt = op.name;
                opPFPDisplay.src = `./imgs/${rarity}/${op.name}`
                opHistoryContainer.appendChild(opPFPDisplay);

                const opDisplayData = document.createElement("div");

                opDisplayData.className = "pl-3";
                opHistoryContainer.appendChild(opDisplayData);

                const opName = document.createElement("p");

                opName.className = "text-yellow-100 text-xl";
                opName.id = `${op.name.split(" ").join("_")}_name`;
                opName.textContent = op.name;

                const opRarity = document.createElement("p");

                opRarity.className = "text-yellow-100 text-xl";
                opRarity.id = `${op.name.split(" ").join("_")}_rarity`;
                opRarity.textContent = "★".repeat(parseInt(rarity));

                const opCount = document.createElement("p");

                opCount.className = "text-yellow-100 text-xl";
                opCount.id = `${op.name.split(" ").join("_")}_count`;
                opCount.textContent = `x${op.count}`;

                opDisplayData.appendChild(opName);
                opDisplayData.appendChild(opRarity);
                opDisplayData.appendChild(opCount);
            }
        }
    }
    overlay.style.display = "none";
};

const checkHistoryIntegrity = (history) => {
    overlay.style.display = "flex";
    overlayText.textContent = "Loading... Please wait!";
    
    const constantBannerKeys = ["10thRollPity", "totalRollsCount", "currentRollCount", "ops"];
    const constantRarityKeys = ["6*", "5*", "4*", "3*"];

    if(Object.keys(history).length != constantBannerKeys.length) {
        overlay.style.display = "none";
        return false;
    }

    for(const banner of Object.keys(history)) {
        if(constantRarityKeys.length != Object.keys(history[banner].ops).length) {
            overlay.style.display = "none";    
            return false;
        }

        if(!bannersList.includes(banner)) {
            overlay.style.display = "none";
            return false;
        }

        for(const key of Object.keys(history[banner])) {
            if(!constantBannerKeys.includes(key)) {
                overlay.style.display = "none";
                return false;
            }
        }

        for(const rarity of Object.keys(history[banner].ops)) {
            if(!constantRarityKeys.includes(rarity)) {
                overlay.style.display = "none";
                return false;
            }

            for(const op of Object.keys(history[banner].ops[rarity])) {
                if(!opsList.includes(op.name)) {
                    overlay.style.display = "none";
                    return false;
                }
            }
        }
    }
    overlay.style.display = "none";
    return true;
};

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
}

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
        const message = new Error("Unknown reading error.");
        console.log(message)
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
        let isRateUp;

        if(rollCount > 50) {
            rarities = pityCalculator(rarities, rollCount - 50);
        }

        if(totalRollsCount === 10 && tenthRollPity) {
            rarity = access.gacha(tenthRoll);
        }
        else {
            rarity = access.gacha(rarities);
        }
        
        if(currentBanner.name.contains("Joint")) {
            isRateUp = 1;
        }
        else {
            isRateUp = access.RNG(1);
        }

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

        const opCount = document.getElementById(`${op.split(" ").join("_")}_count`);
        opCount.textContent = `x${result.filter(ops => ops === op).length}`;
    });
    
    result = [];
    rollButton.disabled = false;
    singleRollButton.disabled = false;
    customRoll.disabled = false;
};