export {
    gacha, jsonLoader, RNG
};

const jsonLoader = async (urlToJSON) => {
    try {
        if(urlToJSON.endsWith(".json")) {
            const response = await fetch(urlToJSON);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            console.log("Not a JSON file.");
        }
    }
    catch(error) {
        console.error("Failed to load JSON:", error);
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
        return null;
    }

    if(end === null) {
        end = start;
        start = 0;
    }
    return Math.floor(Math.random() * (end - start + 1)) + start;
};