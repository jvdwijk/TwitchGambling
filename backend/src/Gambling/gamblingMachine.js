const config = require("./gamblingConfig.json");
const Reel = require("./reel");

class GamblingMachine {

    constructor() {
        for (let i = 0; i < config.reels.length; i++) {
            this.reels[i] = new Reel(config.reels[i])
        }
        this.spinGamble(5, 5);
    }

    spinGamble(coinValue, payline) {
        for (let i = 0; i < config.reels.length; i++) {
            console.log(this.reels[i].getDigitalReelLength())

        }
        console.log(`Your results are:  ${reelCharacters[0]} - ${reelCharacters[1]} - ${reelCharacters[2]}`);

    }
}