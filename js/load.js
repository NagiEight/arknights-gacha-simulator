import { jsonLoader } from "access.js";

const exportData = document.getElementById();
const importData = document.getElementById();
const historyDisplay = document.getElementById("character-gallery");
const bannerList = document.querySelectorAll("input[type=\"radio\"][name=\"btn_banner\"]");
const body = document.body;
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("textDislay");


body.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();

    overlay.style.display = "flex";
    overlayText.textContent = "Drop file to load";
});

body.addEventListener("dragleave", () => {
    overlay.style.display = "none";
});

importData.addEventListener("change", (event) => {
    event.preventDefault();
    event.stopPropagation();
    overlay.style.border = "none";
    overlayText.textContent = "Loading... Please wait!";

    const file = event.target.files[0];
    let temp = jsonReader(file);

    if((!file || file.type !== "application/json") ||
    !checkHistoryIntegrity(temp[0]) ||
    Object.keys(temp[1])[0] !== "currentBanner" ||
    !bannersList.includes(temp[1].currentBanner)) {
        alert("Please drop a valid history file.");
        return;
    }
    else {
        history = temp[0];
        currentBanner = temp[1].currentBanner;
    }

    displayHistory(history[0]);

    overlay.style.display = "none";
});

body.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    overlay.style.border = "none";
    overlayText.textContent = "Loading... Please wait!";
    
    const file = event.target.files[0];
    let temp = jsonReader(file);

    if((!file || file.type !== "application/json") ||
    !checkHistoryIntegrity(temp[0]) ||
    Object.keys(temp[1])[0] !== "currentBanner" ||
    !bannersList.includes(temp[1].currentBanner)) {
        alert("Please drop a valid history file.");
        return;
    }
    else {
        history = temp[0];
        currentBanner = temp[1].currentBanner;
    }

    displayHistory(history[0]);
    
    overlay.style.display = "none";
});

bannerList.forEach((banner) => {
    banner.addEventListener("click", event => {
        jsonLoader(`./banners/info/${event.target.value}.json`).then(data => {
            currentBanner = data;
        }).catch(error => console.error(error));
    });
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



const displayHistory = (history) => {
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
};

const checkHistoryIntegrity = (history) => {
    const constantBannerKeys = ["10thRollPity", "totalRollsCount", "currentRollCount", "ops"];
    const constantRarityKeys = ["6*", "5*", "4*", "3*"];

    if(Object.keys(history).length != constantBannerKeys.length) {
        return false;
    }

    for(const banner of Object.keys(history)) {
        if(typeof history[banner] !== "object") {
            return false;
        }

        if(constantRarityKeys.length != Object.keys(history[banner].ops).length) {
            return false;
        }

        if(!bannersList.includes(banner)) {
            return false;
        }

        for(const key of Object.keys(history[banner])) {
            if(!constantBannerKeys.includes(key)) {
                return false;
            }

            if(key === "ops" && typeof history[banner][key] !== "object") {
                return false;
            }
            else if(key !== "ops" && typeof history[banner][key] !== "number") {
                return false;
            }
        }

        for(const rarity of Object.keys(history[banner].ops)) {
            if(!constantRarityKeys.includes(rarity)) {
                return false;
            }

            for(const op of Object.keys(history[banner].ops[rarity])) {
                if(!opsList.includes(op.name)) {
                    return false;
                }

                if(typeof op.count !== "number") {
                    return false;
                }
            }
        }
    }
    return true;
};