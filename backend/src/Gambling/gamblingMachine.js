const config = require("./gamblingConfig.json")
const Reel = require("./reel")
const MathUtil = require("../utils/mathUtil") 

class GamblingMachine {

    constructor() {
        this.reels = []
        for (let i = 0; i < config.reels.length; i++) {
            this.reels[i] = new Reel(config.reels[i])
        }
    }

    spinGamble(coinValue, payline) {
        this.physicalSlots = []
        let characters = []
        let characterNumbers = []
        for (let i = 0; i < config.reels.length; i++) {
            const digitalNumber = Math.floor(Math.random() * this.reels[i].reelLength)
            this.physicalSlots[i] = this.reels[i].findPhysicalSlot(digitalNumber)

            characters[i] = " " + config.characters[this.physicalSlots[i].character]
            characterNumbers[i] = config.characters[this.physicalSlots[i].slotNumber]
        }

        const coinsGained = this._fullComboCheck(payline) * coinValue
        

        return {"characters": characters, "slotNumbers": characterNumbers, "coinsGained": coinsGained} 
    }

    _fullComboCheck(payline){
        let coinsGained = 0;
        if(payline - 1 > config.paylines.length)
            payline = config.paylines.length + 1

        for (let i = 0; i < payline; i++) {
            const paylineCharacters = this._getPaylineCharacters(i)
            coinsGained += this._checkCombos(paylineCharacters)            
        }
        return coinsGained;
    }

    _getPaylineCharacters(paylineNumber){
        let paylineCharacters = []

        for (let i = 0; i < config.paylines[paylineNumber].length; i++) {
            let position = this.physicalSlots[i].slotNumber + config.paylines[paylineNumber][i]
            position = MathUtil.setLoop(0, this.reels[i].reelInfo.slots.length - 1, position)
            paylineCharacters[i] = this.reels[i].reelInfo.slots[position].character
        }
        return paylineCharacters
    }

    _checkCombos(paylineCharacters){
        let coinsGained = 0
        config.combos.forEach(combo => {
            //TODO check if combo has multiple values inside AND check if combo uses the ANY character (6)
            if(combo.characters.toString() === paylineCharacters.toString()){
                coinsGained += combo.value
            }
        });
        return coinsGained
    }
}

module.exports = GamblingMachine