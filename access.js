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
        if(random < cumulative) {
            return choice.name;
        }
    });
};

const RNG = (start, end = null) => {
    /**
     * @function RNG
     * @description Generates a random number from start to end(inclusive).
     * @description If end is not provided, generate a random number from 0 to start(inclusive) instead.
     */
    if(start === null || start === undefined) {
        throw new Error("Start value undefined.");
    }

    if(typeof start !== "number" || end !== null && typeof end !== "number") {
        throw new TypeError("Start and end values must be numbers.");
    }

    if(start > end) {
        return 0;
    }

    if(end === null) {
        end = start;
        start = 0;
    }
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

module.exports = {
    browse, gacha, jsonLoader, RNG
};