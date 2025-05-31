const path = require("path");
const fs = require('fs');

const jsonLoader = (pathToJSON) => {
    try {
        const stat = fs.statSync(pathToJSON);
        if(stat.isFile() && pathToJSON.endsWith(".json")) {
            const content = fs.readFileSync(pathToJSON, "utf-8");
            return JSON.parse(content);
        }
        else {
            console.log("Not a JSON file.");
        }
    }
    catch(error) {
        console.error(error);
    }
};

const browse = (folder, rarity) => {
    try {
        const fullPath = path.join(folder, `${rarity}`);
        const characters = fs.readdirSync(fullPath);
        const random = Math.floor(Math.random() * characters.length);
        return Object.assign(jsonLoader(path.join(fullPath, characters[random])), {"rarity": `${rarity}`});
    }
    catch(error) {
        console.error(error);
    }
};

const gacha = (choices) => {
    const total = choices.reduce((sum, choice) => sum + choice.weight, 0);
    const random = Math.random() * total;
    let cumulative = 0;

    choices.forEach(choice => {
        cumulative += choice.weight;
        if (random < cumulative) {
            return choice.name;
        }
    });
};

module.exports = {
    browse, gacha
};