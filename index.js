import * as access from "./access.js";

const rollButton = document.getElementById();
const singleRollButton = document.getElementById();
const bannerList = document.querySelectorAll("input[type=\"radio\"][name=\"btn_banner\"]");
const body = document.querySelector("body");
const opDisplay = document.getElementById();
const exportData = document.getElementById();
const importData = document.getElementById();

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
    "banner1": {
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

let rarities = JSON.parse(JSON.stringify(baseRarities));
let rollCount = 0;
let totalRollsCount = 0;
let tenthRollPity = 1;
let result = [];
let hardpity;
let currentBanner;

rollButton.addEventListener("click", () => {
    roll(10);
});

singleRollButton.addEventListener("click", () => {
    roll(1);
});

exportData.addEventListener("click", () => {
    const dataString = JSON.stringify(history, null, 4);
    const Blob = new Blob([[dataString, {"currentBanner": currentBanner.name}]], { type: "application/json" });
    
    const temp = document.createElement("a");
    temp.href = URL.createObjectURL(Blob);
    temp.download = "pullHistory.json";
    temp.click();
    
    URL.revokeObjectURL(temp.href);
});

importData.addEventListener("change", (event) => {
    const bannerList = [];
    
    access.jsonLoader("bannerData.json").then(data => {
        for(const path of data) {
            bannerList.push(path.split("\\")[3]);
        }
    });

    const file = event.dataTransfer.files[0];
    let isBannerExist = true;
    
    let temp = jsonReader(file);

    if(((!file || file.type !== "application/json")) && 
    !checkHistoryIntegrity(temp[0]) && 
    !isBannerExist && 
    Object.keys(temp[1])[0] !== "currentBanner" && 
    !(temp[1].currentBanner in bannerList)) {
        alert("Please drop a valid history file.");
        return;
    }
    else {
        history = temp[0];
        currentBanner = temp[1].currentBanner;
    }

});

body.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const overlay = document.createElement("div");
    const text = document.createElement("p");
    
    body.appendChild(overlay);
    overlay.appendChild(text);
    
    overlay.id = "dragOverlay";
    
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    text.textContent = "Drop your file here to import pull history";
    text.style.color = "white";
    text.style.border = "20px dashed white";
    text.style.borderRadius = "20px";
    text.style.fontSize = "24px";
    text.style.margin = "99vh 99vw";
    text.style.fontFamily = "Arial, sans-serif";
});

body.addEventListener("dragleave", () => {
    body.removeChild(document.getElementById("dragOverlay"));
});

body.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    body.removeChild(document.getElementById("dragOverlay"));
    
    const bannerList = [];
    
    access.jsonLoader("bannerData.json").then(data => {
        for(const path of data) {
            bannerList.push(path.split("\\")[3]);
        }
    });
    
    const file = event.dataTransfer.files[0];
    let isBannerExist = true;
    
    let temp = jsonReader(file);
    
    if(((!file || file.type !== "application/json")) && 
    !checkHistoryIntegrity(temp[0]) && 
    !isBannerExist && 
    Object.keys(temp[1])[0] !== "currentBanner" && 
    !(temp[1].currentBanner in bannerList)) {
        alert("Please drop a valid history file.");
        return;
    }
    else {
        history = temp[0];
        currentBanner = temp[1].currentBanner;
    }
});

const get = (bannerName = null, op = null, rarity = null) => {
    /**
     * @function get
     * @description Use to get the pull history"s data. Use by the frontend.
     * 
     * @param {string} bannerName - The name of the banner to get the data for. If only this parameter is provided, it will return the full data for that banner.
     * @param {string} op - The name of the operator to get the data for. If this parameter is provided, it will return only the data for that operator. Provide the bannerName parameter to get the data for that operator in a specific banner.
     * @param {string} rarity - Accepted values: "6*", "5*", "4*", "3*". The rarity of the operator to get the data for. If this parameter is provided, it will return only the data for that rarity. Provide the bannerName parameter to get the data for that rarity in a specific banner.
     * 
     * Note: null will be return if both the op and rarity are provided. You don"t need both at once, you just don"t.
     */

    if(!(rarity in ["6*", "5*", "4*", "3*"])) {
        return null;
    }

    if(op && rarity || (!op && !rarity && !bannerName)) {
        return null;
    }

    if(bannerName) {
        if(!op && !rarity) {
            return history[bannerName] || null;
        }
        else if(op) {
            for(const rarity of Object.keys(history[bannerName].ops)) {
                for(const op of history[bannerName].ops[rarity]) {            
                    if(op.name === op) {
                        return op || null;
                    }
                }
            }
        }
        else if(rarity) {
            return history[bannerName].ops[rarity] || null;
        }
    }
    else {
        let output = [];

        if(op) {
            for(const banner of Object.keys(history)) {
                for(const rarity of Object.keys(history[banner].ops)) {
                    for(const op of history[banner].ops[rarity]) {
                        if(op.name === op) {
                            output.push(op);
                        }
                    }
                }
            }
        }
        else if(rarity) {
            for(const banner of Object.keys(history)) {
                output.push(banner.ops[rarity]);
            }
        }
        return output || null;
    }
};

const checkHistoryIntegrity = (history) => {
    const loadingScreen = document.createElement("div");
    const loadingScreenText = document.createElement("p");

    body.appendChild(loadingScreen);
    loadingScreen.appendChild(loadingScreenText);

    loadingScreen.style.position = "fixed";
    loadingScreen.style.top = "0";
    loadingScreen.style.left = "0";
    loadingScreen.style.width = "100vw";
    loadingScreen.style.height = "100vh";
    loadingScreen.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    loadingScreen.style.zIndex = "9999";
    loadingScreen.style.display = "flex";
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    
    loadingScreenText.textContent = "Loading history... Please wait!";
    loadingScreenText.style.color = "white";
    loadingScreenText.style.fontSize = "24px";
    loadingScreenText.style.fontFamily = "Arial, sans-serif";
    
    const bannerList = [];
    const opsList = [];
    const output = true;
    const constantBannerKeys = ["10thRollPity", "totalRollsCount", "currentRollCount", "ops"];
    const constantRarityKeys = ["6*", "5*", "4*", "3*"];
    
    access.jsonLoader("bannerData.json").then(data => {
        for(const path of data) {
            bannerList.push(path.split("\\")[3]);
        }
    });

    access.jsonLoader("opData.json").then(data => {
        for(const op of data) {
            opsList.push(op.split("\\")[3]);
        }
    });

    for(const banner of Object.keys(history)) {
        if(!(banner in bannerList)) {
            output = false;
        }

        for(const key of Object.keys(histroy[banner])) {
            if(!(key in constantBannerKeys)) {
                output = false;
            }
        }

        for(const rarirty of Object.keys(histroy[banner].ops)) {
            if(!(rarity in constantRarityKeys)) {
                output = false;
            }

            for(const op of Object.keys(histroy[banner].ops[rarirty])) {
                if(!(op.name in opsList)) {
                    output = false;
                }
            }
        }
    }

    body.removeChild(loadingScreen);
    return output;
};

bannerList.forEach((banner) => {
    banner.addEventListener("click", event => {
        access.jsonLoader(`./banners/info/${event.target.value}.json`).then(data => {
            currentBanner = data;
        }).catch(error => console.error(error));
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
            rarity.weight = +(rarity.weight * scaleFactor).toFixed(4);
        }
    });
    
    const totalAdjusted = raritiesList.reduce((sum, r) => sum + r.weight, 0);
    const roundingError = 100 - totalAdjusted;
    sixStar.weight += roundingError;

    return raritiesList;
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
        const message = new Error("Unknown reading error.");
        console.log(message)
    };

    reader.readAsText(file);
};

const roll = (count) => {
    rollButton.disabled = true;
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

    for(let i = 0; i < count; i++) {
        rollCount++;
        totalRollsCount++;

        if(rollCount > 50) {
            rarities = pityCalculator(rarities, rollCount - 50);
        }

        if(totalRollsCount === 10 && tenthRollPity) {
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
        if(rarity in ["6", "5"]) {
            tenthRollPity = 0;
        }

        result.push(currentBanner["stdRoster"][`${rarity}*`][access.RNG(currentBanner["stdRoster"][`${rarity}*`].length)]);
    }

    let info;
    result.forEach(ops => {
        access.jsonLoader(".\\opData.json").then(data => {
            const pathToOp = data.find(pathToOp => pathToOp.includes(ops));
            access.jsonLoader(pathToOp).then(opData => {
                info = opData;
            });
        });
        
        opDisplay.innerHTML += `<div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        ">
        <img src="${info.image}" alt="${info.name}">
        <p>${info.name}</p>
        </div>`
    });

    history[currentBanner.name]["10thRollPity"] = tenthRollPity;
    history[currentBanner.name].totalRollsCount = totalRollsCount;
    history[currentBanner.name].currentRollCount = rollCount;

    [...new Set(result)].forEach(op => {
        let pathToOp;
        acccess.jsonLoader(".\\opData.json").then(data => {
            pathToOp = data.find(pathToOp => pathToOp.includes(op));
        });
        const opRarity = pathToOp.split("\\")[2];
        const yes = 1;

        for(const operator of history[currentBanner.name].ops[`${opRarity}*`]) {
            if(operator.name === op) {
                operator.count += result.filter(ops => ops === op).length;
                yes = 0;
                break;
            }
        }
        if(yes) {
            history[currentBanner.name].ops[`${opRarity}*`].push({"name": ops, "count": result.filter(ops => ops === op).length});
        }
    });
    
    result = [];
    rollButton.disabled = false;
    singleRollButton.disabled = false;
};