const access = require('./access.js');

const rollButton = document.getElementById();
const singleRollButton = document.getElementById();
const opDisplay = document.getElementById();

const roll = (x) => {
    /*
    Roll for an x amount of times.
    */
   let output = [];
   for(let i = 0; i < x; i++) {
        let rarity = access.RNG(3, 6);
        output.push(access.browse("./ops", `${rarity}`));
    }
    return output;
}

const displayOp = (opList) => {
    if(opDisplay.innerHTML.length > 0) {
        opDisplay.innerHTML = "";
    }

    opList.forEach(op => {
        opDisplay.innerHTML += `<div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
        ">
            <p>${op.name}</p>
            <img src="${op.img}" alt="${op.name}">
        </div>`
    });
}

rollButton.addEventListener("click", () => {
    displayOp(roll(10));
});

singleRollButton.addEventListener("click", () => {
    displayOp(roll(1));
});
