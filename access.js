const fs = require("fs").promises;
const path = require("path");

const browse = async(folder, rarity) => {
    /*
    Randomizer for the gacha system. Choose from a rariry of 3 to 6, and randomly select an operators from said rarity and return their JSON info.
    */
    try {
        const fullPath = path.join(folder, `${rarity}`)
        const characters = await fs.readdir(fullPath);
        const random = Math.floor(Math.random() * (await characters).length());
        return jsonLoader(path.join(fullPath, characters[random]));
    }
    catch(error) {
        console.error(error);
    }
}

const RNG = (start, end) => { return Math.floor(Math.random() * (end - start + 1)) + start; }

const jsonLoader = async(pathToJSON) => {
    try {
        const stat = await fs.stat(pathToJSON);
        if(stat.isFile() && pathToJSON.endsWith(".json")) {
            const content = await fs.readFile(pathToJSON, "utf-8");
            return JSON.parse(content);
        }
        else {
            return console.log("Not a JSON file.");
        }
    }
    catch(error) {
        console.error(error);
    }
}

module.exports = {
    browse, RNG
}